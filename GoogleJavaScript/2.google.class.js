// Person
Person = function (name, age) {
    this.name = name;
    this.age = age;
};

Person.prototype.getName = function () {
    return this.name;
};

Person.prototype.sayHello = function () {
    console.log('Hello I\'m ' + this.getName());
};

// example
var alice = new Person('Alice', 7);
alice.sayHello();

// inheritance
var inherits = function (childCtor, parentCtor) {
    Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};

var Employee = function (name, age, salary) {
    Person.call(this, name, age);
    this.salary = salary;
};

inherits(Employee, Person);

Employee.prototype.getSalary = function () {
    return this.salary;
};

Employee.prototype.sayHello = function () {
    Person.prototype.sayHello.call();
    console.log('Salary is ' + this.salary);
};