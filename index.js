// asw 6
let student = {
name:Alice,
age:22,
course:"Computer Science"
};
let jsonString = 
JSON.stringify(student);
console.log(jsonString )

// ans 7

function multiplyNumbers(a, b) {
  function multiply(x, y) {
    return x * y;
  }
  return multiply.apply(null, [a, b]);
}

// Example:
console.log(multiplyNumbers(4, 5)); // Output: 20

// ans 8

function personInfo() {
  console.log(`Name: ${this.name}, Age: ${this.age}`);
}

// Example object
const person = {
  name: 'Alice',
  age: 30
};

// Using call() to invoke personInfo with 'person' as context
personInfo.call(person);  // Output: Name: Alice, Age: 30

//ans 9
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Example usage:
const original = {
  name: "Alice",
  hobbies: ["reading", "traveling"]
};

const clone = deepClone(original);
clone.hobbies.push("coding");

console.log("Original:", original);  // { name: "Alice", hobbies: ["reading", "traveling"] }
console.log("Clone:", clone);        // { name: "Alice", hobbies: ["reading", "traveling", "coding"] }
