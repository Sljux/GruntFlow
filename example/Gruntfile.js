/*global module:false*/
module.exports = function(grunt) {

  var flowCredentials = grunt.file.readJSON('Flowfile.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    jshint: {
      options: {
        eqeqeq: true,
        immed: true,
        latedef: 'nofunc',
        newcap: true,
        noarg: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        quotmark: 'single',
        devel: true,
        globals: {
          Task: false,
          Flow: false,
          modules: false,
          utils: false
        }
      },
      files: {
        src: ['*.js']
      }
    },
    flow: {
      options: {
        credentials: flowCredentials
      },
      simulate: {
        options: {
          periodicity: 120000,
          destination: '/sljux/twitter-api-task/source',
          js: grunt.file.read('task.js'),
          simulate: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-http');
  grunt.loadTasks('../tasks/');

  grunt.registerTask('default', ['flow']);

};
