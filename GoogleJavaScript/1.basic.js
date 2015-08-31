require('http').createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8124);


var sayHelloShared = function () {
    console.log("Hello, I'm", this.name);
};

var alice = {
    sayHello: sayHelloShared,
    name: 'Alice'
};

var bob = {
    sayHello: sayHelloShared,
    name: 'Bob',
    child: alice
};

// this
alice.sayHello();
bob.sayHello();
bob.child.sayHello();

// use call
sayHelloShared.call(alice);
sayHelloShared.call(bob);


var Person = function (name, age) {
    this.name = name;
    this.age = age;
};
var alice2 = new Person('Alice', 7);

// new
console.log(alice2.name);
console.log(alice2.age);
console.log(alice2.constructor == Person);

// prototype
var alice3 = {
    name: 'Alice'
};
alice3.age = 7;

console.log(alice3.name);
console.log(alice3.age);
console.log(alice3.address); // undefined

var Constructor = function () {

};
Constructor.prototype.a = 'Apple';
Constructor.prototype.b = 'Banana';

var instance = new Constructor();

console.log(
    Object.getPrototypeOf(instance) == Constructor.prototype
);
console.log(instance.a);
console.log(instance.b);