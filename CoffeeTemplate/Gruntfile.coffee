module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    watch:
      coffee:
        files: ['src/**/*.coffee']
        tasks: 'coffee:app'
    coffee:
      app:
        files: [
          expand: true
          cwd: 'src/'
          src: ['**/*.coffee']
          dest: 'src/js'
          ext: '.js'
        ]
      dist:
        files: [
          expand: true
          cwd: 'src/'
          src: ['**/_all.coffee']
          dest: 'dist/'
          ext: '.js'
        ]
    concat:
      dist:
        src: ['src/hello.coffee', 'src/user.coffee', 'src/main.coffee']
        dest: 'src/_all.coffee'
    karma:
      unit:
        configFile: 'karma.conf.coffee'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-karma'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'publish', ['concat', 'coffee:dist']
  grunt.registerTask 'spec', ['concat', 'karma']