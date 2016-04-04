/**
 * Created by evaris on 25/11/2015.
 */


module.exports = function(grunt){

    //require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-angular-gettext');
   // var mozjpeg = require('imagemin-mozjpeg');
    grunt.initConfig({
        nggettext_extract:{
            pot:{
                files:{
                    'po/template.pot':['**/*.html']
                }
            }
        },
        nggettext_compile:{
          all:{
              files:{
                  'www/js/translation.js':['po/*.po']
              }
          }
        }
    });

    grunt.registerTask('default',['concat','uglify','cssmin','imagemin','replace']);

};
