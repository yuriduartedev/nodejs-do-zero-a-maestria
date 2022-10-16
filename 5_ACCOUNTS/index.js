const inquirer = require("inquirer");
const chalk = require("chalk");

const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: ["Criar conta", "Consultar saldo", "Depositar", "Sacar", "Sair"],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action == "Criar conta") {
        createAccount();
      } else if (action == "Consultar saldo") {
        getBalance();
      } else if (action == "Depositar") {
        deposit();
      } else if (action == "Sacar") {
        withDraw();
      } else if (action == "Sair") {
        thankYouMessage();
      }
    })
    .catch((error) => {
      console.group("error");
      console.log(error);
      console.groupEnd();
    });
}

function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir:"));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black("Essa conta já existe, escolha outro nome"));

        buildAccount();
        return;
      }

      fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (error) => {
        console.group("error");
        console.log(error);
        console.groupEnd();
      });

      console.log(chalk.green("Parabéns, a sua conta foi criada!"));
      operation();
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getBalance() {
  const accountName = await getAccountName();

  if (!checkAccount(accountName)) {
    return getBalance();
  }

  const accountData = getAccount(accountName);

  console.log(chalk.bgGreen.white.bold(`Seu saldo é de R$${accountData.balance}.`));
  restartApp();
}

function restartApp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Deseja realizar outra operação?",
        choices: ["Sim", "Não"],
      },
    ])
    .then((answer) => {
      const desire = answer["action"];

      if (desire === "Sim") {
        operation();
      } else {
        thankYouMessage();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function thankYouMessage() {
  console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"));
  process.exit();
}

async function deposit() {
  const accountName = await getAccountName();

  if (!checkAccount(accountName)) {
    return deposit();
  }

  inquirer
    .prompt([
      {
        name: "amount",
        message: "Qual valor deseja depositar?",
      },
    ])
    .then((answer) => {
      const amount = answer["amount"];

      addAmount(accountName, amount);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getAccountName() {
  return inquirer
    .prompt([
      {
        type: "string",
        name: "accountName",
        message: "Qual nome da conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      return accountName;
    })
    .catch((error) => {
      console.log(error);
    });
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("Esta conta não existe, verifique se digitou corretamente os dados da conta!")
    );
    return false;
  }

  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente!"));
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (error) => {
    console.log(error);
  });

  console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`));
  operation();
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

async function withDraw() {
  const accountName = await getAccountName();

  if (!checkAccount(accountName)) {
    return withDraw();
  }

  inquirer
    .prompt([
      {
        name: "amount",
        message: "Quanto você deseja sacar?",
      },
    ])
    .then((answer) => {
      const amount = answer["amount"];

      removeAmount(accountName, amount);
    })
    .catch((error) => console.log(error));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente!"));
    return withDraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Valor indisponível!"));
    return withDraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (error) => {
    console.log(error);
  });

  console.log(chalk.green(`Foi realizado o saque de R$${amount} da sua conta!`));
  console.log(chalk.green(`Seu saldo total agora é de R$${accountData.balance}.`));

  operation();
}
