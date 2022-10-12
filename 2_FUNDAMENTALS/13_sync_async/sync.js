const fs = require("fs");

console.log("start");

fs.writeFileSync("file.txt", "hi");

console.log("end");
