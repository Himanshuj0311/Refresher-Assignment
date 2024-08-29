

// Constructor function for Person
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Adding introduce method to Person's prototype
Person.prototype.introduce = function() {
    console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
};
// employee.js

// Constructor function for Employee
function Employee( name, age,jobTitle) {
    // Initialize Employee properties
    Person.call(this, name, age);
    this.jobTitle = jobTitle;
}

// Set up inheritance from Person
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Adding work method to Employee's prototype
Employee.prototype.work = function() {
    return `${this.name} is working as a ${this.jobTitle}.`;
};

// main.js

// Create an instance of Person
const person = new Person('John Doe', 30);
console.log(person.introduce()); // Hi, my name is John Doe and I am 30 years old.

// Create an instance of Employee
const employee = new Employee('Jane Smith', 25, 'Software Engineer');
console.log(employee.introduce()); // Hi, my name is Jane Smith and I am 25 years old.
console.log(employee.work());     // Jane Smith is working as a Software Engineer.
