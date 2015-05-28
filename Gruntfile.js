"use strict";
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: "public/images",
            src: ["**/*.png"],
            dest: "public/images",
            ext: ".min.png"
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: "public/images",
            src: ["**/*.jpg"],
            dest: "public/images",
            ext: ".min.jpg"
          }
        ]
      }
    },
    sass:{
      global:{
        options:{
          sourceMap: false,
          sourceComments: false,
          outputStyle: "expanded"
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ["**/*.scss"],
          dest: "public/css",
          ext: ".css"
          }]
      }
    },
    watch:{
      options:{
        livereload: true
      },
      site:{
        files: ["public/*.html", "public/css/*.css", "public/images/**/*.{png,jpg,jpeg,gif}"]
      },
      css:{
        files: ["src/scss/**/*.scss"],
        tasks: ["sass"]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/css',
          src: ['*.css', '!*.min.css'],
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },
    nodemon: {
      dev: {
        script: "server/web.js"
      }
    },
    concurrent: {
      build: {
        tasks: ["nodemon","watch"],
        options: {
          logConcurrentOutput: true
        }
      },
      production: {
        tasks: ["watch","cssmin"],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    copy: {
      build: {
        cwd: 'source',
        src: [ '**' ],
        dest: 'build',
        expand: true
      },
      production: {
        cwd: 'source',
        src: [ '**' ],
        dest: 'build',
        expand: true
      },
    }
  });
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-replace");

  // development
  grunt.registerTask("dev", ["concurrent:build"]);
  // image compression
  grunt.registerTask("build", ["concurrent:production","compress"]);
  grunt.registerTask("compress", ["imagemin"]);
};