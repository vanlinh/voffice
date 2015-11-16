module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'client/app/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            files: [
                'client/*.html',
                'client/**/*.html',
                'client/**/**/*.html',
                'client/**/**/*.js',
                'client/**/*.js',
                'client/*.js',
                'client/**/*.css',
                'client/**/**/*.css'
            ],
            tasks: ['jshint']
        },
        express: {
            options: {
                port: process.env.PORT || 8080,
                base: '.',
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.registerTask('default', ['express', 'watch']);

};