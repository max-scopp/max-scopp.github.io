module.exports = function(grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-haml2html');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /**
     * GRUNTFILE CONFIGURATION ================================================
     */
    var baseConf = {
        less: {
            options: {
                compress: true,
                sourceMap: true,
                outputSourceFiles: true,

                plugins: [
                    new (require('less-plugin-autoprefix'))({
                        browsers: [
                            // Like a boss... not.
                            "last 100 versions", "> 0%", "ie 9", "ie 10"
                        ]
                    }),
                ]
            },

            build: {
                expand: true,
                cwd: 'src/less/',
                src: ['main.less'],
                dest: 'css/',
                ext: '.css',
            },
        },
        haml: {
            options: {
                style: 'expanded',
                format: 'html5'
            },

            build: {
                expand: true,
                cwd: 'src/haml/',
                src: ['index.haml'],
                ext: '.html',
            }
        },

        watch: {
            less: {
                files: "**/*.less",
                tasks: 'less:build'
            },
            haml: {
                files: "**/*.haml",
                tasks: 'haml:build'
            }
        }
    };

    grunt.initConfig(baseConf);

    grunt.registerTask('default', 'watch');

    // register less-build tasks
    grunt.registerTask('b', ['haml:build', 'less:build']);
    grunt.registerTask('build', ['haml:build', 'less:build']);
};
