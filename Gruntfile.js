module.exports = function(grunt) {
  // Load required Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'styles/',
          src: ['*.css', '!*.min.css'],
          dest: 'styles/',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: 'scripts/',
          src: ['*.js', '!*.min.js'],
          dest: 'scripts/',
          ext: '.min.js'
        }]
      }
    },
    watch: {
      css: {
        files: ['styles/*.css', '!styles/*.min.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['scripts/*.js', '!scripts/*.min.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.registerTask('default', ['cssmin', 'uglify']);
}; 