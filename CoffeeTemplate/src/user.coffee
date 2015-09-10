class User
  # static private param
  _uid = 987654321

  # constructor
  constructor: (@NAME, @age) ->

  # public method
  profile: ->
    return @NAME + " : " + @age

  # private method
  _toAge = ->
    @age++