/**
 * 
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2016-12-06 14:03:28
 * @version $Id$
 */

 module.exports = function(grunt) {

   // Project configuration.
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     //开发者服务器
     connect: {
       server: {
         options: {
           port: 4000,
           base: 'build',
           hostname: '*'
         }
       }
     },
     //代码改动自动编译
     watch: {
       stylesheets: {
         files: 'src/**/*.styl',
         tasks: [ 'stylesheets' ]
       },
       scripts: {
         files: 'src/**/*.coffee',
         tasks: [ 'scripts' ]
       },
       jade: {
         files: 'src/**/*.jade',
         tasks: [ 'jade' ]
       },
       copy: {
         files: [ 'src/**', '!src/**/*.styl', '!src/**/*.coffee', '!src/**/*.jade' ],
         tasks: [ 'copy' ]
       }
     },
     //文件copy
     copy: {
           build: {
             cwd: 'src',
             src: [ '**', '!**/*.styl' ],
             dest: 'build',
             expand: true
           },
     },
     //文件clean
     clean: {
       build: {
         src: ['dist']
       },
     },
     //文件合并
     concat: {
     	foo: {
     		src: ['build/a.js','build/b.js'],
     		dest: 'build/a_b.js'
     	}
     },
     //代码检查
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
     },
     //代码压缩
     uglify: {
       options: {
         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
       },
       dist: {
           files: {
             'dist/<%= pkg.name %>.min.js': ['<%= concat.foo.dest %>']
           }
        }
       // build: {
       //   src: 'src/<%= pkg.name %>.js',
       //   dest: 'build/<%= pkg.name %>.min.js'
       // }
     }
   });
   // 加载包含"connect" 任务的插件
   grunt.loadNpmTasks('grunt-contrib-connect');
   // 加载包含"watch" 任务的插件
   grunt.loadNpmTasks('grunt-contrib-watch');
   // 加载包含"copy" 任务的插件
   grunt.loadNpmTasks('grunt-contrib-copy');
   // 加载包含"clean" 任务的插件
   grunt.loadNpmTasks('grunt-contrib-clean');
   // 加载包含"concat" 任务的插件
   grunt.loadNpmTasks('grunt-contrib-concat');
   // 加载包含"jshint" 任务的插件
   grunt.loadNpmTasks('grunt-contrib-jshint');
   // 加载包含 "uglify" 任务的插件
   grunt.loadNpmTasks('grunt-contrib-uglify');
   // 默认被执行的任务列表
   // grunt.registerTask('default', ['concat']);
   grunt.registerTask(
     'default', 
     'Watches the project for changes, automatically builds them and runs a server.', 
     [ 'build', 'connect', 'watch' ]
   );
   // 综合clean和copy创建build任务
   grunt.registerTask(
     'build', 
     'Compiles all of the assets and copies the files to the build directory.', 
     [ 'jshint', 'clean', 'copy' ]
   );
 };