(function() {
  var User, hello, user;

  hello = function() {
    return console.log("Hello world!!");
  };

  User = (function() {
    var _toAge, _uid;

    _uid = 987654321;

    function User(NAME, age) {
      this.NAME = NAME;
      this.age = age;
    }

    User.prototype.profile = function() {
      return this.NAME + " : " + this.age;
    };

    _toAge = function() {
      return this.age++;
    };

    return User;

  })();

  hello();

  user = new User("Tanaka", 24);

  console.log(user.profile());

}).call(this);
