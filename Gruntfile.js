'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'dist/build.js', 'src/*.js', 'spec/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      files: ['src/*.js'],
      tasks: ['concat']
    },
    concat: {
      dist: {
        src: ['src/*.js'],
        dest: 'dist/build.js',
        options: {
          banner: ";(function( window, undefined ){",
          //banner: ";(function( window, undefined ){ \n 'use strict';",
          footer: "}( window ));"
        }
      }
    }    
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint']);

};