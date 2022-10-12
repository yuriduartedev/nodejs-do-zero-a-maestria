const chalk = require("chalk");

const grade = 4;

if (grade >= 7) {
  console.log(chalk.green("Congrats! You are approved!"));
} else {
  console.log(chalk.bgRed("Sorry! You are repproved!"));
}
