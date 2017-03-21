/**
 * 项目打包配置文件
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2016-12-07 13:35:05
 * @version $Id$
 */
var init = function(grunt){
	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 4000,
					base: 'build',
					hostname: '*'
				}
			}
		},
		watch: {
			stylesheets: {
				files: 'src/**/*.css',
				tasks: [ 'stylesheets' ]
			},
			scripts: {
				files: 'src/**/*.js',
				tasks: [ 'scripts' ]
			},
			copy: {
				files: [ 'src/**', '!src/**/*.html' ,'!src/**/*.styl', '!src/**/*.coffee', '!src/**/*.jade' ],
				tasks: [ 'copy' ]
			}
		},
		copy: {
			build: {
				cwd: 'src',
				src: [ '**', '!**/*.html' ,'!**/*.styl', '!**/*.coffee', '!**/*.jade' ],
				dest: 'build',
				expand: true
			},
		},
		cssmin: {
			options: {
				banner: '/*! application.css <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
			},
			build: {
				files: {
					'build/application.css': [ 'build/**/*.css' ]
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! application.js <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
			},
			build: {
				options: {
					mangle: false
				},
				files: {
					'build/application.js': [ 'build/**/*.js' ]
				}
			}
		},
		clean: {
			build: {
				src: [ 'build' ]
			},
			stylesheets: {
				src: [ 'build/**/*.css', '!build/application.css' ]
			},
			scripts: {
				src: [ 'build/**/*.js', '!build/application.js' ]
			},
		},
		open: {
			server: {
				path: 'src/index.html',
				// app: 'Google Chrome'
			}
		},
		jshint: {
			all: [
				'src/**/*.js',
				'!src/leaflet.js'
			],
			options: {
				globals: {
					$: false,
					jQuery: false
				},
				browser: true,
				devel: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask(
		'stylesheets',
		'Compiles the css files.',
		[ 'cssmin', 'clean:stylesheets' ]
	);
	grunt.registerTask(
		'scripts',
		'Compiles the JavaScript files.',
		[ 'uglify', 'clean:scripts' ]
	);

	grunt.registerTask(
		'build',
		'Compiles all of the assets and copies the files to the build directory.',
		[ 'clean:build', 'copy', 'stylesheets', 'scripts' ]
	);

	grunt.registerTask(
		'default', 
		'Watches the project for changes, automatically builds them and runs a server.', 
		['build', 'connect', 'watch' ]
	);
};
module.exports = init;
