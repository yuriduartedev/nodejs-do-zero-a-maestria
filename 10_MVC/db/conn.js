const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodemvc", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

try {
  console.log(`Successfully connected with MySQL! ✅`);
} catch (error) {
  console.log(`Cannot connect to database error: ${error}`);
}

module.exports = sequelize;
