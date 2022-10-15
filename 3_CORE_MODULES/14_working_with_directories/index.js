const fs = require("fs");

if (!fs.existsSync("./myFolder")) {
  console.log("Not found");
  fs.mkdirSync("myFolder");
}

if (fs.existsSync("./myFolder")) {
  console.log("Exists");
}
