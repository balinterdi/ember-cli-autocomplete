/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    // Add options here
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', { destDir: 'assets' });
  app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.eot', { destDir: 'fonts' });
  app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.svg', { destDir: 'fonts' });
  app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.ttf', { destDir: 'fonts' });
  app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.woff', { destDir: 'fonts' });
  app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.woff2', { destDir: 'fonts' });

  return app.toTree();
};
