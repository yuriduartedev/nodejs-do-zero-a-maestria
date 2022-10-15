const os = require("os");

console.group("os.cpus()");
console.log(os.cpus());
console.groupEnd();

console.group("os.freemem()");
console.log(os.freemem());
console.groupEnd();

console.group("os.homedir()");
console.log(os.homedir());
console.groupEnd();

console.group("os.type");
console.log(os.type);
console.groupEnd();
