module.exports = function(grunt) {
    'use strict';

    var allBigBossFiles = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/bootstrap.js',
        'bower_components/backbone/backbone.js',
        'bower_components/marionette/lib/backbone.marionette.js',
        'bower_components/angular/angular.js',
        'bower_components/ember/ember.js',
        'bower_components/knockout/dist/knockout.debug.js',
        'bower_components/lodash/lodash.js',
        'bower_components/lodash-compat/lodash.js',
        'bower_components/underscore/underscore.js',
        'bower_components/moment/moment.js',
        'bower_components/requirejs/require.js',
        'bower_components/d3/d3.js'
    ];

    //
    // MAIN CONFIG variable
    //
    var config = {
        pkg: grunt.file.readJSON('package.json'),

        // Custom task.
        mapage: {
            create: {
                dest: 'dist/mapage.html',
                templateUrl: 'tasks/mapage.tpl',
                context: {
                    content: 'Hello my dear DIV element',
                    cssClass: 'unbelievable'
                }
            }
        },

        //
        // SERVERS section
        //

        // https://github.com/gruntjs/grunt-contrib-connect
        connect: {
            server1: {
                options: {
                    port: 2014,
                    keepalive: true,
                    debug: true,
                    open: true,
                    livereload: 3579,
                    hostname: "*" // Now you can access from 127.0.0.1 and localhost, and 192.168.137.128
                }
            },
            forPlato: {
                options: {
                    port: 2015,
                    base: 'dist/plato_reports/',
                    keepalive: true,
                    open: true,
                    hostname: 'localhost'
                }
            },
            // Based on https://github.com/intesso/connect-livereload
            server2: {
                options: {
                    port: 3000,
                    keepalive: true,
                    hostname: 'localhost',
                    middleware: function(connect) {
                        return [
                            require('connect-livereload')()
                            // checkForDownload,
                            // mountFolder(connect, '.tmp'),
                            // mountFolder(connect, 'app')
                        ];
                    }
                }
            },
            /*
                Critical CSS test server (for grunt-criticalcss and grunt-penthouse tasks).
                Go, and hit the command 'grunt criticalcss' or grunt penthouse'.
                Both should give similar results.
            */
            forCriticalCss: {
                options: {
                    port: 2016,
                    keepalive: true,
                    //base: 'dist/criticalcss/',
                    open: true,
                    hostname: 'localhost'
                }
            }
        },
        // + https://www.npmjs.org/package/grunt-reload
        // But it seems to be outdated.

        // https://github.com/bustardcelly/grunt-forever
        // https://www.npmjs.org/package/grunt-forever-multi
        forever: {
            server1: {
                options: {
                    index: 'index.js',
                    logDir: 'logs'
                }
            },

            server2: {
                options: {
                    index: 'otherindex.js',
                    logDir: 'logs'
                }
            }
        },

        // https://github.com/ChrisWren/grunt-nodemon
        nodemon: {
            dev: {
                options: {
                    ext: 'js,html'
                        // even so, doesn't watch index.html
                        // even $ nodemon -e js,html - Doesn't
                },
                script: 'index.js'
            }
        },

        //
        // CONCAT, MINIFY/UGLIFY/BEAUTIFY section
        //

        // https://github.com/gruntjs/grunt-contrib-concat
        concat: {
            target: {
                options: {
                    separator: ";",
                    banner: "/*\n" +
                        "* NEW YEAR IS COMMING SOON\n" +
                        "*/\n",
                    stripBanners: {
                        options: {
                            block: true,
                            line: true
                        }
                    }
                },
                files: {
                    'dist/js/by_concat/file_concated.js': allBigBossFiles
                }
            }
        },

        // https://github.com/gruntjs/grunt-contrib-uglify
        uglify: {
            minifyMe: {
                options: {
                    banner: "/* I'm minified file ever :) */\n",
                    preserveComments: false,
                    compress: true
                },
                files: {
                    'dist/js/by_uglify/file_minified.js': allBigBossFiles
                }
            },
            beautifyMe: {
                options: {
                    banner: "/* I'm beautified file ever :) */\n",
                    beautify: {
                        // line width that the beautifier will try to obey.
                        // It refers to the width of the line text (excluding indentation)
                        width: 100, // default 80
                        // More details here: https://github.com/mishoo/UglifyJS2
                        beautify: true
                    }
                },
                files: {
                    'dist/js/by_uglify/file_beautified.js': allBigBossFiles
                }
            }
        },

        // https://github.com/gruntjs/grunt-contrib-cssmin
        cssmin: {
            target1: {
                options: {
                    banner: "/* My minified CSS */\n"
                },
                files: {
                    'dist/css/by_cssmin/bootstrap_but_minified.css': ['dist/css/by_less/bootstrap.css']
                }
            },
            target2: { // depends on grunt compass
                files: {
                    'dist/css/by_cssmin/css_dev/main.min.css': ['dist/css/by_compass/css_dev/main.css'],
                    'dist/css/by_cssmin/css_prod/main.min.css': ['dist/css/by_compass/css_prod/main.css']
                }
            }

        },

        // https://github.com/gruntjs/grunt-contrib-htmlmin
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: false,
                    removeOptionalTags: true,
                    removeEmptyElements: false
                },
                files: {
                    'dist/index.html': 'index.html',
                    'dist/index2.html': 'index2.html'
                }
            }
        },

        // If u need and want, there is https://github.com/gruntjs/grunt-contrib-imagemin
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'dist/images'
                }]
            }
        },

        //
        // LESS, SASS, SCSS, COMPASS section
        //

        // https://github.com/gruntjs/grunt-contrib-less
        less: {
            dev: {

                // To avoid issue "not written because no source files were found." use exactly THIS way:
                // files: [{
                //     expand: true,
                //     cwd: "bower_components/bootstrap/less/",
                //     src: ["bootstrap.less"],
                //     dest: "dist",
                //     ext: ".css"
                // }]

                // or this simple:
                files: {
                    "dist/css/by_less/bootstrap.css": "bower_components/bootstrap/less/bootstrap.less"
                }

            },
            prod: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    "dist/css/by_less/bootstrap.min.css": "bower_components/bootstrap/less/bootstrap.less"
                }
            }
        },

        // https://github.com/gruntjs/grunt-contrib-sass | by Sindre
        sass_1: {
            dist1: {
                options: {
                    style: 'expanded',
                    trace: true
                        // cwd: 'styles'
                },
                files: {
                    // 'destination': 'source'
                    'dist/css/by_ruby/1/main.css': 'assets/styles/main.scss',
                    'dist/css/by_ruby/1/test.css': 'assets/styles/test.sass'
                }
            },
            dist2: {
                files: [{
                    expand: true,
                    cwd: 'assets/styles',
                    src: ['*.scss', '*.sass'],
                    dest: 'dist/css/by_ruby/2/',
                    ext: '.css'
                }]
            }
        },

        // libsass on C. => https://github.com/hcatlin/libsass
        // https://github.com/sass/node-sass
        // https://github.com/sass/node-sass-middleware
        // See example in the end of file.

        // And now, based on node-sass (libsass) we have grunt plugin:
        // https://github.com/sindresorhus/grunt-sass
        sass: {
            options: {
                sourceMap: true
            },
            dist3: {
                files: {
                    'dist/css/by_libsass/main.css': 'assets/styles/main.scss',
                    'dist/css/by_libsass/test.css': 'assets/styles/test.sass'
                }
            }
        },

        // https://github.com/gruntjs/grunt-contrib-compass
        // requires to have Ruby (installed on Mac)
        // optional "gem update --system" => updates ruby-gems to 2.4.4
        // requires "gem install sass" => v3.4.8
        // requires "gem install compass" => v1.0.1
        compass: {
            options: {
                sassDir: 'assets/sass',
                importPath: 'bower_components',
                noLineComments: true,
                force: true, // We can overwrite, instead of cleaning.
                // bundleExec: false,
                // watch: true

                // httpPath
                // generatedImagesDir: '.tmp/assets/images/generated',
                //relativeAssets: true,
                imagesDir: 'assets/img',
                // javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: 'assets/myfonts'
                // importPath: '<%= yeoman.app %>/bower_components',
                // httpImagesPath: '/assets/images',
                // httpGeneratedImagesPath: '/assets/images/generated',
                // httpFontsPath: '/assets/fonts'
                // raw: 'preferred_syntax = :scss\n' // Use `raw` since it's not directly available
            },
            dev: {
                options: {
                    // basePath: ''
                    // environment: 'development' // by default
                    cssDir: 'dist/css/by_compass/css_dev'
                    // raw: 'preferred_syntax = :scss\n' // Use `raw` since it's not directly available
                }
            },
            prod: {
                options: {
                    // basePath: ''
                    environment: 'production',
                    cssDir: 'dist/css/by_compass/css_prod',
                    outputStyle: 'compressed'
                }
            }
        },

        //
        // LINTERs section
        //

        // https://www.npmjs.org/package/grunt-jsonlint
        jsonlint: {
            sample: {
                src: ['eslint.json', '.jshintrc']
            }
        },

        // Suggest to read:
        // http://www.scottlogic.com/blog/2011/03/28/jslint-vs-jshint.html
        // https://web.archive.org/web/20130819215629/http://anton.kovalyov.net/2011/02/20/why-i-forked-jslint-to-jshint/

        // http://derpturkey.com/jslint-with-grunt/
        // https://github.com/stephenmathieson/grunt-jslint
        // JSLINT is a JavaScript program that looks for problems in JavaScript programs. It is a code quality tool.
        // JSLINT originnally by Douglas Crockford
        jslint: {
            dev: {
                src: 'assets/for_inject/workflow.js',
                // exclude: [
                //     'some/path/to/config.js'
                // ],
                options: {
                    junit: 'dist/jslint/server-junit.xml', // VERY handy thing for CI server like Jenkins.
                    errorsOnly: true,
                    log: 'dist/jslint/server-lint.log',
                    failOnError: false // For this project only !!!
                },
                directives: {
                    node: false,
                    browser: true,
                    nomen: true,
                    todo: true,
                    unparam: true,
                    predef: [
                        '$', 'console',
                        '_', 'exports', 'define',
                        'Handlebars',
                        'Backbone'
                    ]
                }
            },
            me: {
                files: {
                    src: ['Gruntfile.js']
                },
                directives: {
                    node: false,
                    browser: true,
                    nomen: true,
                    todo: true,
                    unparam: true,
                    predef: [
                        '$', 'module', 'console',
                        '_', 'exports', 'define',
                        'Handlebars',
                        'Backbone'
                    ]
                }
            }
        },

        // https://github.com/gruntjs/grunt-contrib-jshint
        // js-hint helps to detect errors and potential problems in your JavaScript code
        // Anton Kovalyov and Paul Irish fork of JSLINT
        jshint: {
            dev: {
                // Be aware that jshintrc settings are not merged with your Grunt options.
                options: {
                    //jshintrc: '.jshintrc', // || true
                    curly: false,
                    eqeqeq: false,
                    eqnull: true,
                    sub: true
                    // immed: false,
                    // globals: {
                    //     jQuery: true,
                    //     $: true,
                    //     console: true
                    // }
                },
                files: {
                    src: ['assets/for_inject/workflow.js']
                }
            },
            me: {
                files: {
                    src: ['Gruntfile.js']
                }
            }
        },

        //
        // grunt-eslint by @sindresorhus => https://www.npmjs.org/package/grunt-eslint
        eslint: {
            options: {
                config: 'eslint.json'
                // rulesdir: ['./rules']
            },
            target: ['bower_components/jquery/dist/jquery.js']
        },
        // But there is another clone:
        // eslint-grunt by @iancmyers => https://www.npmjs.org/package/eslint-grunt

        // https://github.com/gruntjs/grunt-contrib-csslint
        csslint: {
            strict: {
                options: {
                    // csslintrc: '.csslintrc',
                    import: 2
                },
                src: ['dist/bootstrap.css']
            },
            relax: {
                options: {
                    import: false
                },
                src: ['dist/bootstrap.css']
            }
        },

        // https://www.npmjs.org/package/grunt-lesslint
        lesslint: {
            dev: {
                src: ['bower_components/bootstrap/less/bootstrap.less']
            }
        },

        // https://github.com/ahmednuaman/grunt-scss-lint
        scsslint: {
            allFiles: [
                'assets/styles/*.{scss,sass}'
            ],
            options: {
                // emitError: true,
                bundleExec: false, // we should use false, otehrwise it will not work visially in console.
                config: '.scss-lint.yml', // Info about linters/rules: https://github.com/causes/scss-lint#linters
                // reporterOutput: 'scss-lint-report.xml', // for Jenkinse
                colorizeOutput: true
            }
        },

        // https://github.com/ChrisWren/grunt-mdlint
        mdlint: {
            all: ['*.md']
        },

        // https://github.com/jsoverson/grunt-plato
        plato: {
            target: {
                options: {
                    jshint : grunt.file.readJSON('.jshintrc')
                    // or ,
                    // complexity: {
                    //     logicalor: false,
                    //     switchcase: false,
                    //     forin: true,
                    //     trycatch: true
                    // }
                },
                files: {
                    'dist/plato_reports': allBigBossFiles
                }
            }
        },

        //
        // Access to file, read/write. Cleaning logs.
        //

        // https://www.npmjs.org/package/grunt-remove-logging | Last update Sep-2014
        removelogging: {
            dist: {
                options:{
                    // replaceWith: "// !!! PLEASE DO NOT LEAVE console.log()-s; !!!",
                    namespace: ['console', 'window.console']
                },
                src: 'assets/for_inject/index.js',
                dest: 'dist/by_removelogging/index.js'
            }
        },
        // You can tell this task to keep specific logging statements
        // by adding the comment directive /*RemoveLogging:skip*/ after the statement:

        // https://github.com/jsoverson/grunt-strip | Last update in 2013 (Looks not maintained package)
        // And by default buggy - instead of console.log() it leaves 0. Expected nothing "".
        strip: {
            main: {
                options : {
                    // inline : true,
                    // replaceWith: "", // borrowed from removelogging, but doesn't work here.
                    nodes : ['console.log', 'debug', 'debugger']
                },
                src: 'assets/for_inject/index.js',
                dest: 'dist/by_strip/index.js'
            }
        },

        // But I would recommend search
        // https://www.npmjs.org/package/grunt-search
        search: {
            inlineStyles: {
                files: {
                    src: ["tasks/mapage.tpl"]
                },
                options: {
                    searchString: /style\s?=\s?["']*/g,
                    logFormat: "console"
                }
            },
            bad_very_bad: {
                files: {
                    src: allBigBossFiles.concat(['tasks/mapage.js'])
                },
                options: {
                    searchString: /(console|debugger|ddescribe|iit|fuck)/g,
                    logFormat: "console",
                    failOnMatch: true
                }
            }
        },

        //
        // SHELL, ENV, EXEC, PATH, PROMPT section
        //

        // https://github.com/jharding/grunt-exec | based on separate, own task
        // by jharding. Last update: Jul 15, 2014
        exec: {
            hello: {
                cwd: "./",
                stderr: true,
                stdout: true,
                cmd: function() {
                    return "/bin/sh ./hello.sh";
                }
            },
            forEnv: {
                cwd: "./",
                stderr: true,
                stdout: true,
                cmd: function() {
                    return "echo $NODE_ENV; echo $USER;";
                }
            }
        },

        // https://github.com/sindresorhus/grunt-shell | based on chalk
        shell: {
            options: {
                stderr: false
            },
            target: {
                command: '/bin/sh ./hello.sh'
            }
        },
        // See shell.JS example in the end of file.

        // https://github.com/jsoverson/grunt-env | Last update Oct-2014
        env: {
            options: {
                //Shared Options Hash
                replace: {
                    USER: 'alundiak'
                }
            },
            dev: {
                NODE_ENV: 'development',
                DEST: 'temp',
                concat: {
                    PATH: {
                        'value': 'node_modules/.bin',
                        'delimiter': ':'
                    }
                }
            },
            prod: {
                src: 'config/prod.json'
            }
        },

        // https://www.npmjs.org/package/grunt-path
        path: {
            options: {
                // Use SHA1 algorithm
                algorithm: 'sha1',

                process: function(content, files) {
                    // var yaml = require('js-yaml');
                    // var jf = require('jsonfile')
                    // var file = 'dist/files.json'
                    return JSON.stringify(content);
                    // Save file in YAML format
                    // return yaml.safeDump(content);
                }
            },

            build: {
                files: [{
                    'dist/files.json': ['assets/styles/**/*', 'tasks/**/*', 'bower_components/**/*.{js,css}']
                }]
            }
        },

        // https://github.com/chuckmo/grunt-ssh
        secret: grunt.file.readJSON('config/secret.json'),
        // or
        sshconfig: {
            "myConfig": grunt.file.readJSON('config/secret.json')
        },
        sshexec: {
            test1: {
                command: 'uptime',
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            },
            test2: {
                command: 'uptime',
                options: {
                    config: 'myConfig'
                }
            },
            ls: {
                command: 'ls -la',
                options: {
                    config: 'myConfig'
                }
            }
        },

        // https://github.com/dylang/grunt-prompt
        prompt: {
            target: {
                options: {
                    questions: [{
                        config: 'config.name', // arbitrary name or config for any other grunt task
                        type: 'list', // list, checkbox, confirm, input, password
                        message: 'Please enter your score for presentation?', // Question to ask the user, function needs to return a string,
                        default: 'A', // default value if nothing is entered
                        choices: ['A', 'B', 'C', 'D']
                        // validate: 'function(value)',
                        // filter: function(value),
                        // when: function(answers)
                    }]
                }
            }
        },

        //
        // DEPENDENCY MANAGEMENT section
        //

        // https://www.npmjs.org/package/grunt-bower-task
        // Pros: u get rid of many not needed files (as we have in bower_components)
        bower: {
            copySources: {
                options: {
                    targetDir: 'dist/js/by_bower/bower_components'
                    // layout: 'byType',
                    // install: true,
                    // verbose: false,
                    // cleanTargetDir: false,
                    // cleanBowerDir: false,
                    // bowerOptions: {}
                }
            }
        },
        // There is almost the same clone package: https://github.com/curist/grunt-bower | Not tried.

        //
        // FILES, FODLERS, CLEAN, COPY, SYNC section
        //

        // https://github.com/gruntjs/grunt-contrib-clean
        clean: {
            target: {
                src: ['dist', '.sass-cache']
            }
        },

        // https://github.com/gruntjs/grunt-contrib-copy
        copy: {
            main: {
                flatten: true,
                expand: true, // good example, how to not use folder name.
                src: allBigBossFiles,
                dest: 'dist/js/by_copy/bower_components/'
            }
        },

        // https://github.com/tomusdrw/grunt-sync
        sync: {
            main: {
                files: [{
                    // cwd: 'src',
                    src: allBigBossFiles,
                    dest: 'dist/tomcat/webapps'
                }],
                options: {
                    spawn: true
                },
                pretend: false, // true will reject ANY IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
                verbose: true // Display log messages when copying files

                //, updateAndDelete: true // Remove all files from dest that are not found in src
                // But buggy:
                // => Fatal error: This deferred has already been resolved
            }
        },

        /*
        Have a look to : https://github.com/tschaub/grunt-newer
        Looks very similar to sync and multitasking with grunt
        */

        // https://github.com/sindresorhus/grunt-concurrent | Created in Apr-2013
        concurrent: {
            target1: ['concat', 'uglify', 'cssmin', 'htmlmin', 'imagemin'],
            target2: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['csslint', 'lesslint', 'jsonlint', 'jslint:dev', 'jshint:dev', 'mdlint']
            }
        },
        // There is grunt-contrib-parallel implemented sonner than concurrent
        // https://github.com/iammerrick/grunt-parallel | Created in Feb-2013
        // In fact doing the same.

        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            scripts: { // if files changed, run copy and sync
                files: allBigBossFiles,
                tasks: ['copy', 'sync'],
                options: {
                    spawn: false
                }
            },
            livereload: {
                options: {
                    livereload: 3579
                },
                files: allBigBossFiles.concat(['*.*'])
            }
        },

        // https://github.com/ChrisWren/grunt-inject
        inject: {
            single: {
                scriptSrc: 'assets/for_inject/workflow.js',
                files: {
                    'dist/by_inject/index_single.html': 'assets/for_inject/index.html'
                }
            },
            multiple: {
                scriptSrc: ['assets/for_inject/workflow.js', 'assets/for_inject/index.js'],
                files: [{
                    expand: true,
                    flatten: true, // get rid of not necessary folders
                    // cwd: 'src', // doesn't work for me
                    src: ['assets/for_inject/index.html', 'assets/for_inject/index2.html'],
                    dest: 'dist/by_inject_multiple'
                }]
            }
        },

        // There is another module for almost the same:
        // https://www.npmjs.org/package/grunt-sails-linker
        // TODO

        //
        // MARKDOWN, DOCS, TEMPLATE section
        //

        // https://www.npmjs.org/package/grunt-readme
        // DEPRECATED. Please use Verb instead.

        // https://github.com/assemble/verb
        // https://github.com/assemble/grunt-verb
        // https://www.npmjs.org/package/grunt-verb
        verb: {
            readme: {
                files: [
                    {src: ['assets/docs/.verb.md'], dest: 'dist/docs/README_by_verb.md'}//,
                    //{expand: true, cwd: 'assets/docs', src: ['**/*.tmpl.md'], dest: '.', ext: '.md'},
                ]
            }
        },

        // https://github.com/mathiasbynens/grunt-template
        template: {
            options: {
                data: {
                    componentID: 123,
                    componentName: 'hello'
                }
            },
            'README.md': {
                options: {
                    data: {
                        // Doesn't work. Here componentID is not visible anymore.
                        // Details: https://github.com/mathiasbynens/grunt-template/issues/9 reporeted by me.
                        componentName: 'no way?'
                    }
                },
                files: {
                    'dist/docs/README_by_template.md': ['assets/docs/README.md.tpl']
                }
            }
        },

        // https://github.com/ericmatthys/grunt-changelog
        changelog_1: {
            sample: {
                options: {
                    // Task-specific options go here.
                }
            }
        },

        // https://github.com/btford/grunt-conventional-changelog
        changelog: {
            options: {
                // Task-specific options go here.
                // editor: 'Sublime Text.app'// TODO
            }
        },

        // https://github.com/cbas/grunt-rev
        rev: {
            files: {
                src: ['dist/file_minified.js', 'dist/bootstrap.css']
            }
        },

        //
        // CRITICAL CSS section
        //

        // https://github.com/bezoerb/grunt-critical
        // uses/requires https://github.com/addyosmani/critical
        critical: {
            target: {
                options: {
                    base: './',
                    css: [
                        'assets/critical_site/main.css',
                        'dist/bootstrap.css'
                    ],
                    width: 320,
                    height: 70
                },
                src: 'assets/critical_site/index.html',
                dest: 'dist/css/by_critical/generated.css'
            }
        },

        // https://github.com/filamentgroup/grunt-criticalcss
        criticalcss: {
            target: {
                options: {
                    url: "http://localhost:2016", // Server should run !!! to work
                    width: 1200,
                    height: 900,
                    outputfile: "dist/css/by_criticalcss/generated.css",
                    filename: "dist/css/by_less/bootstrap.css",
                    buffer: 800*1024,
                    ignoreConsole: false
                }
            }
        },

        // https://github.com/fatso83/grunt-penthouse
        // "grunt-penthouse"requires also "penthouse" module.
        // https://github.com/pocketjoso/penthouse
        penthouse: {
            target: {
                outfile: 'dist/css/by_penthouse/generated.css',
                css: 'dist/css/by_less/bootstrap.css',
                url: 'http://localhost:2016',
                width: 1300,
                height: 900,
                skipErrors: false // this is the default
            }
        },

        //
        // GIT related section
        //

        // https://github.com/vojtajina/grunt-bump
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
            }
        },

        // https://github.com/tschaub/gh-pages
        'gh-pages':{
            options: {
                base: 'assets/gh-gh',
                // add: true, // If you want the task to add new src files but leave existing ones untouched
                dotfiles: true,
                message: 'gh-pages updated'
                //, tag:'v1.0.2'
                //, tag:'v%VERSION%'
            },
            src: '**' // src: '**/*'
        },

        githooks: {
            'pre-commit': 'eslint'
        }

    };

    //
    // INIT PHASE
    //
    grunt.initConfig(config);

    //
    // LOAD packages PHASE
    //

    // Simple, native approach:
    // grunt.loadNpmTasks('grunt-contrib-connect');
    // ...

    // or
    // https://www.npmjs.org/package/matchdep
    // require('matchdep').filterDev('*').forEach(grunt.loadNpmTasks);

    // or
    // https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    //
    // LOAD a custom task
    //
    grunt.loadTasks("tasks");

    //
    // REGISTER custom tasks
    //
    grunt.registerTask("go", ["connect:server1", "watch:livereload"]);

    grunt.registerTask("devMode", [
        'env:dev', 'exec:forEnv'
    ]);

    grunt.registerTask("prodMode", [
        'env:prod', 'exec:forEnv'
    ]);

    grunt.registerTask("gimmePlato", [
        'plato', 'connect:forPlato'
    ]);

    grunt.registerTask("Because", [
        "inject", "removelogging", "strip",
        "concat",
        "uglify", "less",
        "sass", "compass",
        "cssmin",
        "exec", "shell",
        "devMode", "prodMode",
        "bower", "path",
        "copy",
        "mapage:create", // ONLY WITH SUFFIX :create. Otherwise task has issue. #TBD (Jan-23-2016 - changed a bit, but not yet real multitask).
        "plato" // First time it will show warnings, because no JSON files, but it creates in fact, so 2nd run will ahve success.
        // After this command, we may try other gimme-like commands
    ]);

    grunt.registerTask("IAmLazy", [
        "jsonlint", "jslint:dev", "jshint:dev", "eslint",
        "csslint",/*"lesslint", "scsslint",*/
        // "mdlint" // DOESN"T WORK (Aug-25-2016)
    ]);

    grunt.registerTask("DoAll", ["Because", "IAmLazy"]);
    grunt.registerTask("default", ["DoAll"]);

    // https://github.com/arturadib/shelljs
    // var shell = require('shelljs');
    // shell.echo('JavaScript says Hello to Shell');


    // var sass = require('node-sass');
    // sass.renderFile({
    //     file: 'assets/styles/main.scss',
    //     outFile: 'dist/css/main.css',
    //     sourceMap: true,
    //     success: function() {
    //         console.log("SUCCESS");
    //     },
    //     error: function(err) {
    //         console.log(err);
    //     },
    // });

};
