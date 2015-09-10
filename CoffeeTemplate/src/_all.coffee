hello = ->
  console.log("Hello world!!")
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
hello()

user = new User("Tanaka", 24)
console.log(user.profile())
