const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

console.log(args);

const name = args["name"];
const occupation = args["occupation"];

console.group("name, occupation");
console.log(name, occupation);
console.groupEnd();

console.log(`His name is ${name} and he is ${occupation}!`);
