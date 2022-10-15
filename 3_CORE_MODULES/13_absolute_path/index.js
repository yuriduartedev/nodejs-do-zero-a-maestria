const path = require("path");

// Absolute path
console.log(path.resolve("test.txt"));

// Dynamic path
const midFolder = "reports";
const fileName = "yuri.txt";

const finalPath = path.join("/", "files", midFolder, fileName);

console.group("finalPath");
console.log(finalPath);
console.groupEnd();
