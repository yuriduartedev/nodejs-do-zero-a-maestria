// External module
const minimist = require("minimist");

// Internal module
const sum = require("./sum").sum;

const args = minimist(process.argv.slice(2));

const a = parseInt(args["a"]);
const b = parseInt(args["b"]);

const result = sum(a, b);

console.log(`The sum between ${a} and ${b} is ${result}.`);
