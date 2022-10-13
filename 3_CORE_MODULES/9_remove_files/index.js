const fs = require("fs");

const oldFileName = "file.txt";
const newFileName = "newFile.txt";

fs.rename(oldFileName, newFileName, (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(`File renamed to ${newFileName}.`);
});
