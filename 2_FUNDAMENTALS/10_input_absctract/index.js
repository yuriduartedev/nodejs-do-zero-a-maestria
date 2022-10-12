const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      name: "question_1",
      message: "Whats first grade",
    },
    {
      name: "question_2",
      message: "Whats second grade",
    },
  ])
  .then((answers) => {
    console.log(answers);
    const average = (parseInt(answers.question_1) + parseInt(answers.question_2)) / 2;

    console.log(`The average is ${average}`);
  })
  .catch((error) => console.log(error));
