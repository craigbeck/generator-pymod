'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');


var PymodGenerator = module.exports = function PymodGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', {
    type: String,
    required: false
  });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || path.basename(process.cwd());
  }
};

util.inherits(PymodGenerator, yeoman.generators.Base);

PymodGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  // console.log(this.yeoman);

  var prompts = [{
    name: 'moduleName',
    message: 'module name?',
    default: this.env.options.appPath
  }, {
    name: 'modulePath',
    message: 'module path?',
    default: path.join(path.basename(path.join(process.cwd(), '..')), this.env.options.appPath)
  }, {
    name: 'description',
    message: 'description for this module?'
  }, {
    name: 'useAlembic',
    message: 'use Alembic migrations?',
    type: 'confirm',
    default: false
  }, {
    name: 'useFlask',
    message: 'use Flask (includes Flask-RESTful)?',
    type: 'confirm',
    default: false
  }, {
    name: 'useFlaskLogin',
    message: 'use Flask-Login?',
    type: 'confirm',
    default: false
  }, {
    name: 'useSqlAlchemy',
    message: 'use Flask-SQLAlchemy?',
    type: 'confirm',
    default: false
  }, {
    name: 'otherPyDeps',
    message: 'space delimited list of other python dependencies to include:',
    type: 'string',
    default: ''
  }];

  this.prompt(prompts, function(props) {
    this.appPath = props.moduleName;
    this.moduleName = props.moduleName;
    this.modulePath = props.modulePath;
    this.description = props.description;
    this.useAlembic = props.useAlembic;
    this.useFlask = props.useFlask;
    this.useAngular = props.useAngular;
    this.useFlaskLogin = props.useFlaskLogin;
    this.useSqlAlchemy = props.useSqlAlchemy;

    var deps = _.filter((props.otherPyDeps ? props.otherPyDeps.split(' ') : []), 'length');

    this.pythonDeps = deps;
    cb();
  }.bind(this));
};

PymodGenerator.prototype.app = function app() {
  this.template('_README.md', 'README.md');
  this.mkdir(this.appPath);
  this.write(path.join(this.appPath, '__init__.py'), '');

  var deps = this.pythonDeps;

  if (this.useFlask) {
    deps.push('gevent');
    deps.push('gunicorn');
    deps.push('Flask');
    deps.push('Flask-RESTful');
    deps.push('Werkzeug');

    if (this.useFlaskLogin) {
      deps.push('Flask-Login');
    }
    if (this.useSqlAlchemy) {
      deps.push('Flask-SQLAlchemy');
    }
  } else {
    this.copy('main.py', path.join(this.appPath, '__main__.py'));
  }

  this.deps = _.sortBy(deps, function(s){ s.toLowerCase(); });
  this.template('_setup.py', 'setup.py');
};

PymodGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
};

PymodGenerator.prototype.alembic = function alembic() {
  if (this.useAlembic) {
    var alembicDir = path.join(this.appPath, 'alembic');
    this.mkdir(alembicDir);
    this.mkdir(path.join(alembicDir, 'versions'));
    this.template('alembic/_alembic.ini', path.join(alembicDir, 'alembic.ini'));
    this.template('alembic/_README.md', path.join(alembicDir, 'README.md'));
    this.template('alembic/_schema.py', path.join(this.appPath, 'schema.py'));
  }
}

PymodGenerator.prototype.flask = function flask() {
  if (this.useFlask) {
    this.copy('flask/main.py', path.join(this.appPath, '__main__.py'));
    this.copy('flask/server.py', path.join(this.appPath, 'server.py'));
  }
};
