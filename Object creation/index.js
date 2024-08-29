function animal(noOfLegs, vegetarian) {
    return {
        noOfLegs: noOfLegs,
        vegetarian: vegetarian,
        eat: function() {
            return "eating...";
        },
        greet: function() {
            return `Hi, I have ${this.noOfLegs} legs.`;
        }
    };
}

// Usage
let a1 = animal(4, true);
console.log(a1.eat()); // eating...
console.log(a1.greet()); // Hi, I have 4 legs.

function AnimalCF(noOfLegs, vegetarian) {
    this.noOfLegs = noOfLegs;
    this.vegetarian = vegetarian;
    this.eat = function() {
        return "eating...";
    };
    this.greet = function() {
        return `Hi, I have ${this.noOfLegs} legs.`;
    };
}

// Usage
let animalCF = new AnimalCF(4, true);
console.log(animalCF.eat()); // eating...
console.log(animalCF.greet()); // Hi, I have 4 legs.

class AnimalES6 {
    constructor(noOfLegs, vegetarian) {
        this.noOfLegs = noOfLegs;
        this.vegetarian = vegetarian;
    }
    
    eat() {
        return "eating...";
    }
    
    greet() {
        return `Hi, I have ${this.noOfLegs} legs.`;
    }
}

// Usage
let animalES6 = new AnimalES6(4, true);
console.log(animalES6.eat()); // eating...
console.log(animalES6.greet()); // Hi, I have 4 legs.

function describe() {
    return `Hi, I have ${this.noOfLegs} legs and I am ${this.vegetarian ? 'vegetarian' : 'not vegetarian'}.`;
}

let animalData1 = { noOfLegs: 4, vegetarian: true };

console.log(describe.call(animalData1)); // Hi, I have 4 legs and I am vegetarian.

function describe() {
    return `Hi, I have ${this.noOfLegs} legs and I am ${this.vegetarian ? 'vegetarian' : 'not vegetarian'}.`;
}

let animalData = [4, true];

function createAnimal(noOfLegs, vegetarian) {
    return {
        noOfLegs: noOfLegs,
        vegetarian: vegetarian
    };
}

console.log(describe.apply(createAnimal(...animalData))); // Hi, I have 4 legs and I am vegetarian.
