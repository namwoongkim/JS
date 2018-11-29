//Constructor
function Person(name, gender) {
    var married = true;
    this.name = name;
    this.gender = gender;
    this.sayHello = function () {
        console.log('Hi! My name is ' + this.name);
    };
}

var person = new Person('Kim', 'male');

console.log(typeof person);
console.log(person);

console.log(person.name);
console.log(person.gender);