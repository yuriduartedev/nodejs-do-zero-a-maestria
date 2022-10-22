const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log(`Successfully connected with MySQL! ✅`);
} catch (error) {
  console.log(`Cannot connect to database error: ${error}`);
}

module.exports = sequelize;
