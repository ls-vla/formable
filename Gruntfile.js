module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'http-server': {
      dev: {
        root: '/',
        port: 9000,
        host: '127.0.0.1',
        cache: 300,
        showDir : true,
        autoIndex: true,
        defaultExt: 'html',
        runInBackground: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-http-server');

}
