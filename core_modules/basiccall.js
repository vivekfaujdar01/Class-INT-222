function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

function farewell() {
  console.log("Goodbye!");
}

greet("Alice", farewell);