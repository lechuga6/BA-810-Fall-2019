// 1. Write a function that takes two arguments.  
// The first is a temperature and the second is toScale.  
// If the toScale argument is C, convert the temperature from Fahrenheit to Celsius.  
// If toScale is F, convert the temperature from Celsius to Fahrenheit.  
let temp = 32;
let toScale = 'c';

function convert(temp, toScale) {
    let convertedTemp;

    if (toScale === 'c') {
        // convert to celcuis
        convertedTemp = (temp-32) * 5/9;
    } else if (toScale === 'f') {
        // convert to f
        convertedTemp = (temp*9/5) + 32;
    } else {
        return 'An error occurred while trying to convert the temperature.';
    }

    return convertedTemp;
}

console.log(convert(temp, toScale));

// 2. Write a function that has two arguments and returns the higher of the two.  
// The function should return 'Out of range' if the values are not in the range 40 - 60.  
// Your code should log the result to the console.

function higher(var1, var2) {
    if ((var1 > 60 || var1 < 40) || (var2 > 60 || var2 < 40)) {
        return 'Out of range';
    } 
    return var1 > var2 ? var1 : var2;
}

console.log(higher(43, 45));

// 3. Write a function that takes a string like this:
// let foo = "5 + 4";
// The values (5 and 4) can be any two numbers and the operator can be +, -,  / or *.   
// The expression should only have two values and one operator.  
// The function should divide this into parts using a statement like this:
// let parts = foo.split(" ");
// You can log parts to see what this does. 
// The function should then return the result of the operation.  

let math = '4 + 5';

function operate(math) {
    let experession = math.split(" ");
    switch(experession[1]){
        case '+':
            return parseFloat(experession[0]) + parseFloat(experession[2]);
        case '-':
            return parseFloat(experession[0]) - parseFloat(experession[2]);
        case '*':
            return parseFloat(experession[0]) * parseFloat(experession[2]);
        case '/':
            return parseFloat(experession[0]) / parseFloat(experession[2]);
        default:
            return 'Error';
    }
}

console.log(operate(math));
// 4. Write a JavaScript function that reverses a string. 
// Research the join, reverse and split methods to do it.  
// Your program should log the original string and the reversed string to the console.
// Example:
// cat
// tac

function reverse(str) {
    return str.split('').reverse().join('');
}

console.log(reverse('taco'));

// 5. Write a JavaScript function that takes three numbers as arguments and logs them in ascending order.
// Example:
// myFunction(4, 52, -1)
// -1, 4, 52

function ascending(val1, val2, val3) {
    if (isNaN(val1) || isNaN(val2) || isNaN(val3)) {
        return 'Error';
    }
    let values = [val1, val2, val3];
    values.sort(function(a, b){return a - b});
    return `${values[0]}, ${values[1]}, ${values[2]}`
}

console.log(ascending(4, 52, -1));

console.log(ascending(6, 56, 9));
// 6. Write a JavaScript function that takes an array of objects that contain student names and grades and computes the average and logs them in ascending order.
// Example:
// var students = [['David', 80], ['Vinoth', 77], ['Divya', 88], ['Ishitha', 95], ['Thomas', 68]];
// The average is 81.6
// Thomas 68
// Vinoth 77
// David 80
// Divya 88
// Ishitha 95

function orderStudents(students) {
    let average = 0;
    students.forEach(item => {
        average += item[1];
    });

    average /= students.length;

    students.sort(function(a, b){return a[1] - b[1]})
    console.log(students);

    return `The average is ${average}`;
}

var students = [['David', 80], ['Vinoth', 77], ['Divya', 88], ['Ishitha', 95], ['Thomas', 68]];

console.log(orderStudents(students));
// 7. Write an object constructor for a circle.  
// Include a property for the radius and two methods to calculate the area and circumference. 
function Circle(radius) {
    this.radius = radius;
    this.area = function() {
        return Math.PI * this.radius * this.radius;
    }
    this.circumference = function() {
        return 2 * Math.PI * this.radius;
    }
}
// 8. The first step in brewing beer is to soak malted grains in hot water to convert carbohydrates to sugars.  
// This process is called mashing and the resulting sugar water is called wort.  
// The amount of sugar that a type of grain can contribute is called the max ppg (points/pounds/gallon).  
// The amount of sugars in the wort is indicated by specific gravity and, assuming all the sugars are converted, 
// the maximum gravity that a wort can have is called the expected original gravity (expected OG).  
// To calculate the expected OG, you multiple the quantity of grain (in pounds) times the max ppg, 
// sum that over all grains and then divide by the amount of wort (in gallons).

// Create a object constructor called Grain that has two properties (max ppg and quantity) and one method that returns the product of max ppg and quantity.
function Grain(maxPPG, quantity) {
    this.maxPPG = maxPpg;
    this.quantity = quantity;
    this.calcEOG = function() {
        return this.maxPpg * this.quantity;
    }
}

// Create a second object constructor called Mash that has a property called volume and a property that is a array of Grain objects.  
// The Mash object has two methods:  addGrain takes two arguments and creates a Grain object and adds it to the array and calcEOG 
// calculates the expected OG.
function Mash(volume, grains) {
    this.volume = volume;
    this.grains = grains ? grains : [];
    this.addGrain = function(maxPPG, quantity) {
        var temp = new Grain(maxPPG, quantity);
        this.grains.push(temp);
    }
    this.calcEOG = function() {
        let EOG = 0;
        this.grains.forEach(item => {
            EOG += item.calcEOG();
        });
        return EOG / this.volume;
    }
}

// Example:

// Grain	Quantity	Max ppg
// Pale Malt (2 Row)	9	37
// Caramel/Crystal Malt - 20L	.75	35
// Volume: 7 gal

// Expected OG: 51.32