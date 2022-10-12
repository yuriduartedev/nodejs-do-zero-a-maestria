const inquirer = require("inquirer");
const chalk = require("chalk");

inquirer
  .prompt([
    {
      name: "question_1",
      message: "Whats your name?",
    },
    {
      name: "question_2",
      message: "Whats your age?",
    },
  ])
  .then((answers) => {
    console.log(answers);
    const name = answers.question_1;
    const age = answers.question_2;
    console.log(chalk.bgYellow.black(`Your name is ${name} and you has ${age} years.`));
  })
  .catch((error) => console.log(error));
