// Declare and assign variables
let num1 = 10;
let num2 = 5;
let name = "Noor";
let greeting = "Hello";

// arithmetic operations
let addition = num1 + num2;
let subtraction = num1 - num2;
let multiplication = num1 * num2;
let division = num1 / num2;

// string operations
let fullGreeting = greeting + ", " + name + "!";
let nameLength = name.length;
let upperCaseName = name.toUpperCase();

// Displaying results in the DOM
let output = `
  <h2>Arithmetic Operations</h2>
  <p>Addition: ${num1} + ${num2} = ${addition}</p>
  <p>Subtraction: ${num1} - ${num2} = ${subtraction}</p>
  <p>Multiplication: ${num1} × ${num2} = ${multiplication}</p>
  <p>Division: ${num1} ÷ ${num2} = ${division}</p>

  <h2>String Operations</h2>
  <p>let name = "Noor";
    let greeting = "Hello";</p>
    <p>let fullGreeting = greeting + ", " + name + "!";</p>
  <p>Full Greeting: ${fullGreeting}</p>
  <p>let nameLength = name.length;</p>
  <p>Length of name: ${nameLength}</p>
  <p>let upperCaseName = name.toUpperCase();</p>
  <p>Uppercase name: ${upperCaseName}</p>
`;

document.getElementById("output").innerHTML = output;
