module.exports = function( grunt ) {

  // Initial config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Compress scripts
    uglify: {
      options: {
        preserveComments: false,
        banner: "/*!\n" +
                "* Gillie JavaScript Library <%= pkg.version %>" +
                "\n* " +
                "<%= pkg.homepage %>" +
                "\n" +
                "*/" +
                "\n"
       },
       dist: {
         files: {
           'gillie.min.js': ['gillie.js']
         }
       }
    },

    // Run QUnit tests
    qunit: {
      files: [ 'tests/index.html' ]
    }
  });


  // Load tasks
  grunt.loadNpmTasks( 'grunt-contrib-qunit' );
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task
  grunt.registerTask( 'default', [ 'qunit', 'uglify' ] );

}
