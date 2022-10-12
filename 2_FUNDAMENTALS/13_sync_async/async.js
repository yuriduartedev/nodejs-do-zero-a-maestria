const fs = require("fs");

console.log("start");

fs.writeFile("async_file.txt", "hi", function (error) {
  setTimeout(() => {
    console.log("Created file!");
  }, 1000);
});

console.log("end");
