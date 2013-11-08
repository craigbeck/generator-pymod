'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PymodGenerator = module.exports = function PymodGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
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
  console.log(this.yeoman);

  var prompts = [{
    name: 'moduleName',
    message: 'module name?',
    default: this.env.options.appPath
  }, {
    name: 'description',
    message: 'description for this module?'
  }];

  this.prompt(prompts, function (props) {
    this.appPath = props.moduleName;
    this.moduleName = props.moduleName;
    this.description = props.description;
    cb();
  }.bind(this));
};

PymodGenerator.prototype.app = function app() {
  this.template('_setup.py', 'setup.py');
  this.template('_README.md', 'README.md');
  this.mkdir(this.appPath)
  this.write(path.join(this.appPath, '__init__.py'), '');
  this.copy('main.py', path.join(this.appPath, '__main__.py'));
};

PymodGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
};
