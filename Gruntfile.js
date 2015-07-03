module.exports = function(grunt) {
    'use strict';

    // grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-concurrent');
    // grunt.loadNpmTasks('grunt-eslint');
    // grunt.loadNpmTasks('grunt-jsonlint');

    // https://www.npmjs.org/package/matchdep
    // require('matchdep').filterDev('*').forEach(grunt.loadNpmTasks);

    // or

    // https://github.com/sindresorhus/load-grunt-tasks
    // by Sindre Sorhus (again and again he reworks MANY packages.)
    require('load-grunt-tasks')(grunt);

    var allBigBossFiles = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/bootstrap.js',
        'bower_components/backbone/backbone.js',
        'bower_components/angular/angular.js'
    ];

    var config = {
        pkg: grunt.file.readJSON('package.json'),

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
                    'dist/file_concated.js': allBigBossFiles
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
                    'dist/file_minified.js': allBigBossFiles
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
                    'dist/file_beautified.js': allBigBossFiles
                }
            }
        },

        // https://github.com/gruntjs/grunt-contrib-cssmin    
        cssmin: {
            target: {
                options: {
                    banner: "/* My minified CSS */\n"
                },
                files: {
                    'dist/bootstrap_but_minified.css': ['dist/bootstrap.css']
                }
            },
            co: {
                options: {
                
                },
                files: {
                    'assets/css_dev/main.min.css': ['assets/css_dev/main.css'],
                    'assets/css_prod/main.min.css': ['assets/css_prod/main.css']
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
                    "dist/bootstrap.css": "bower_components/bootstrap/less/bootstrap.less"
                }

            },
            prod: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    "dist/bootstrap.min.css": "bower_components/bootstrap/less/bootstrap.less"
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
                    'dist/css/by_ruby/1/main.css': 'styles/main.scss',
                    'dist/css/by_ruby/1/test.css': 'styles/test.sass'
                }
            },
            dist2: {
                files: [{
                    expand: true,
                    cwd: 'styles',
                    src: ['*.scss', '*.sass'],
                    dest: 'dist/css/by_ruby/2/',
                    ext: '.css'
                }]
            }
        },

        // https://github.com/gruntjs/grunt-contrib-compass
        // requires to have Ruby (installed on Mac) 
        // optional "gem update --system" => updates ruby-gems to 2.4.4
        // requires "gem install sass" => v3.4.8
        // requires "gem install compass" => v1.0.1
        compass: {
            options: {
                sassDir: 'sass',
                importPath: 'bower_components',
                noLineComments: true,
                force: true, // We can owwrite, instead of cleaning.
                // bundleExec: false,
                // watch: true

                // httpPath    
                // generatedImagesDir: '.tmp/assets/images/generated',
                imagesDir: 'img',
                // javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: 'myfonts',
                // importPath: '<%= yeoman.app %>/bower_components',
                // httpImagesPath: '/assets/images',
                // httpGeneratedImagesPath: '/assets/images/generated',
                // httpFontsPath: '/assets/fonts',
                relativeAssets: false


                // raw: 'preferred_syntax = :scss\n' // Use `raw` since it's not directly available
            },
            dev: {
                options: {
                    // basePath: ''
                    // environment: 'development' // by default
                    cssDir: 'assets/css_dev'  
                    // raw: 'preferred_syntax = :scss\n' // Use `raw` since it's not directly available
                }
            },
            prod: {
                options: {
                    // basePath: ''
                    environment: 'production',
                    cssDir: 'assets/css_prod',
                    outputStyle: 'compressed'
                    
                }
            }
        },

        // libsass on C. => https://github.com/hcatlin/libsass
        // https://github.com/sass/node-sass
        // https://github.com/sass/node-sass-middleware
        // See example in the end of file.

        // And now, based on node-sass (libsass) we have grunt plugin:
        // https://github.com/sindresorhus/grunt-sass - again guess by whom created? right by Sindre.
        sass: {
            options: {
                sourceMap: true
            },
            dist3: {
                files: {
                    'dist/css/by_c/main.css': 'styles/main.scss',
                    'dist/css/by_c/test.css': 'styles/test.sass'
                }
            }
        },

        // TODO - related to SASS
        // https://github.com/nDmitry/grunt-autoprefixer

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
            target: {
                src: allBigBossFiles,
                // exclude: [
                //     'some/path/to/config.js'
                // ],
                options: {
                    junit: 'dist/jslint/server-junit.xml', // VERY handy thing for CI server like Jenkinse.
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
                        '$',
                        '_',
                        'Handlebars',
                        'Backbone',
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
                    // jshintrc: '.jshintrc' // || true

                    curly: false,
                    eqeqeq: false
                        // immed: false,
                        // globals: {
                        //     jQuery: true,
                        //     $: true,
                        //     console: true
                        // }
                },
                target: {
                    src: ['bower_components/jquery/dist/jquery.js']
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
                config: 'eslint.json',
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
                'styles/*.{scss,sass}',
            ],
            options: {
                // emitError: true,
                bundleExec: false, // we should use false, otehrwise it will not work visially in console.
                config: '.scss-lint.yml', // Info about linters/rules: https://github.com/causes/scss-lint#linters
                // reporterOutput: 'scss-lint-report.xml', // for Jenkinse
                colorizeOutput: true
            },
        },

        // https://github.com/ChrisWren/grunt-mdlint
        mdlint: {
            all: ['*.md']
        },

        // https://www.npmjs.org/package/grunt-remove-logging | Last update Sep-2014
        removelogging: {
            dist: {
                options:{
                    // replaceWith: "// !!! PLEASE DO NOT LEAVE console.log()-s; !!!",
                    namespace: ['console', 'window.console']
                },
                src: 'index.js',
                dest: 'index_a.js'
            }
        },
        // You can tell this task to keep specific logging statements 
        // by adding the comment directive /*RemoveLogging:skip*/ after the statement:

        // https://github.com/jsoverson/grunt-strip | Last update in 2013 (Looks not maintained package)
        // And by default buggy - instead of console.log() it leavse 0. Expected nothing "".
        strip: {
            main: {
                options : {
                    // inline : true,
                    // replaceWith: "", // borrowed from removelogging, but doesn't work here.
                    nodes : ['console.log', 'debug', 'debugger']
                },
                src: 'index.js',
                dest: 'index_b.js'
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
        // Again by Sindre Sorhus (Last update Sep 1, 2014)
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
                src: 'prod.json'
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
                    'dist/files.json': ['styles/**/*', 'tasks/**/*', 'bower_components/**/*.{js,css}']
                }]
            }
        },

        // https://github.com/chuckmo/grunt-ssh
        secret: grunt.file.readJSON('secret.json'),
        // or
        sshconfig: {
            "myConfig": grunt.file.readJSON('secret.json')
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
                        choices: ['A', 'B', 'C', 'D'],
                        // validate: 'function(value)',
                        // filter: function(value),
                        // when: function(answers)
                    }]
                }
            }
        },

        // https://www.npmjs.org/package/grunt-bower-task
        // Pros: u get rid of many not needed files (as we have in bower_components)
        bower: {
            copySources: {
                options: {
                    targetDir: 'dist/lib'
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

        // https://github.com/gruntjs/grunt-contrib-clean    
        clean: {
            target: {
                src: ['dist', '.sass-cache']
            }
        },

        // https://github.com/gruntjs/grunt-contrib-copy    
        copy: {
            main: {
                src: allBigBossFiles,
                dest: 'dist/copied/',
            }
        },

        // https://github.com/tomusdrw/grunt-sync
        sync: {
            main: {
                files: [{
                    // cwd: 'src',
                    src: allBigBossFiles,
                    dest: 'dist/tomcat/webapps',
                }],
                options: {
                    spawn: true,
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
        // Again by Sindre Sorhus        
        concurrent: {
            target1: ['concat', 'uglify', 'cssmin', 'htmlmin', 'imagemin'],
            target2: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['csslint', 'lesslint', 'jsonlint', 'jslint', 'jshint', 'mdlint']
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
                scriptSrc: 'workflow.js',
                files: {
                    'index2.html': 'index.html'
                }
            },
            multiple: {
                scriptSrc: ['dist/lib/**/*.js'],
                files: [{
                    expand: true,
                    // cwd: 'src',
                    src: ['index.html'],
                    dest: 'dist'
                }]
            }
        },

        // There is another module for almost the same:
        // https://www.npmjs.org/package/grunt-sails-linker
        // TODO

        // https://www.npmjs.org/package/grunt-readme
        // DEPRECATED. Please use Verb instead.

        // https://github.com/assemble/verb
        // https://github.com/assemble/grunt-verb
        // https://www.npmjs.org/package/grunt-verb
        verb: {
            target: {}
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

        // https://github.com/gruntjs/grunt-contrib-connect
        connect: {
            server1: {
                options: {
                    port: 2014,
                    // keepalive: true,
                    debug: true,
                    open: true,
                    livereload: 3579,
                    hostname: "*" // Now you can access from 127.0.0.1 and localhost, and 192.168.137.128
                }
            },
            forPlato: {
                options: {
                    port: 2015,
                    keepalive: true,
                    base: 'dist/plato_reports/',
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
                            require('connect-livereload')(),
                            // checkForDownload,
                            // mountFolder(connect, '.tmp'),
                            // mountFolder(connect, 'app')
                        ];
                    }
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

        /* Phantom.JS, Jasmine, Mocha, Karma, Protractor

        https://github.com/gruntjs/grunt-contrib-qunit
        https://github.com/gruntjs/grunt-contrib-jasmine
        https://www.npmjs.org/package/grunt-jasmine-runner
        
        https://github.com/karma-runner/grunt-karma

        https://github.com/kmiyashiro/grunt-mocha
        
        https://github.com/angular/protractor
        https://www.npmjs.org/package/grunt-protractor-runner
        // Isseue: When u have protractor instaleld, grunt-protractor-runner will be installed differently
        */

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
        
        // https://github.com/filamentgroup/grunt-criticalcss
        criticalcss: {
            custom: {
                options: {
                    url: "http://localhost:2015", // Server should run !!! to work
                    width: 1200,
                    height: 900,
                    outputfile: "dist/critical.css",
                    filename: "dist/bootstrap.css",
                    buffer: 800*1024,
                    ignoreConsole: false
                }
            }
        },

        template: {
          options: {
            data: {
              componentID: 123,
              componentName: 'hello'
            }
          },
          'README.md' : {
            options:{
                data:{
                    // Doesn't work. Here componentID is not visible anymore.
                    componentName: 'no way?'       
                }
            },
            files: {
              'docs/README.md': [ 'docs/README.md.tpl']
            }
          }
        }
        
        // TODO gh-pages

    };

    grunt.initConfig(config);

    //load a custom task
    grunt.loadTasks("tasks");

    grunt.registerTask("default", []);

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
        "concat",
        "uglify", "less",
        "cssmin",
        "sass", "compass",
        "exec", "shell",
        "devMode", "prodMode",
        "bower", "path",
        "copy",
        "mapage:create", // ONLY WITH SUFFIX :create. Otherwise tusk has issue. #TBD.
        "plato" // First time it will show warnings, because no JSON files, but it creates in fact, so 2nd run will ahve success.

    ]);

    grunt.registerTask("IAmLazy", [
        "jsonlint", "jslint", "jshint",
        /*"csslint","lesslint", "eslint",*/ "mdlint"
    ]);

    grunt.registerTask("DoAll", ["Because", "IAmLazy"]);

    grunt.registerTask("go", ["connect:server1", "watch:livereload"]);

    // https://github.com/arturadib/shelljs
    // var shell = require('shelljs');
    // shell.echo('JavaScript says Hello to Shell');


    // var sass = require('node-sass');
    // sass.renderFile({
    //     file: 'styles/main.scss',
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
