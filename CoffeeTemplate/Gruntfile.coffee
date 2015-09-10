module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    watch:
      coffee:
        files: ['src/**/*.coffee']
        tasks: 'coffee:app'
      coffee_spec:
        files: ['spec/**/*.coffee']
        tasks: 'coffee:spec'
    coffee:
      app:
        files: [
          expand: true
          cwd: 'src/'
          src: ['**/*.coffee']
          dest: 'Resources/'
          ext: '.js'
        ]
      spec:
        files: [
          expand: true
          cwd: 'spec/'
          src: ['**/*.coffee']
          dest: 'Resources/spec/'
          ext: '.js'
        ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['watch']