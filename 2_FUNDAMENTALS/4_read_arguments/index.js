const args = process.argv.slice(2);

const name = args[0].split("=")[1];
const age = args[1].split("=")[1];

console.log(`Your name is ${name} and you has ${age} years!`);
