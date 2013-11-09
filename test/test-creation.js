/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('pymod generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('pymod:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.editorconfig',
      'setup.py',
      'README.md',
      'my-mod/__init__.py',
      'my-mod/__main__.py'
    ];

    helpers.mockPrompt(this.app, {
      'moduleName': 'my-mod',
      'description': 'pymod test run'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
