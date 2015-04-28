/*
 * grunt-flow
 * https://github.com/Sljux/GruntFlow.git
 *
 * Copyright (c) 2015 Aljosa Sljuka
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request'),
    async = require('async'),
    chalk = require('chalk');

module.exports = function (grunt) {

  grunt.registerMultiTask('flow', 'Upload FlowThings Tasks', function () {

    var flowBaseUrl = 'https://api.flowthings.io/v0.1/';

    var options = this.options({
      periodicity: 60000,
      simulate: false
    });

    validate(options);

    var done = this.async(),
        credentials = options.credentials,
        method = options.id ? 'PUT' : 'POST',
        url = flowBaseUrl + credentials.username + '/api-task/' + (options.simulate ? 'simulate' : '' );

    var reqOptions = {
      url: url,
      method: method,
      headers: {
        'X-Auth-Token': credentials.token
      },
      json: {
        destination: options.destination,
        periodicity: options.periodicity,
        js: options.js
      }
    };

    request(reqOptions, function (error, response, body) {

      if (!body.head.ok)
        fail(body.head.errors);

      grunt.log.writeln(body.head.messages.join('\n'));

      options.simulate ? logSimulate(body) : log(body);

      done();
    });
  });
  function validate(options) {
    if (!options.credentials)
      grunt.fail.fatal('No credentials supplied');

    if (!options.credentials.username)
      grunt.fail.fatal('No username supplied in credentials');

    if (!options.credentials.token)
      grunt.fail.fatal('No token supplied in credentials');

    if (!options.destination)
      grunt.fail.fatal('No destination Flow supplied in options');

    if (!options.js)
      grunt.fail.fatal('No JavaScript supplied in options');
  }

  function fail(errors) {
    grunt.fail.fatal(errors.join('\n'));
  }

  function log(data) {
    grunt.verbose.writeln('Created a Task with ' + chalk.green('id ' + data.body.id));
  }

  function logSimulate(data) {
    grunt.log.writeln('Generated ' + chalk.green(data.body.drops.length) + ' drops');

    grunt.verbose.writeln(chalk.green('Drops:'));
    grunt.verbose.writeln(JSON.stringify(data.body.drops, null, 4));

    grunt.verbose.writeln(chalk.green('Log:'));
    grunt.verbose.writeln(JSON.stringify(data.body.log, null, 4));
  }

};
