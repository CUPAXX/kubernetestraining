const crypto = require("crypto");

// using crypto js to generating random string
const randomString = crypto.randomUUID();

// Function to print timestamp + stored string
function printString() {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${randomString}`);
}

// Print every 5 seconds
setInterval(printString, 5000);

// Print immediately at the start
printString();
