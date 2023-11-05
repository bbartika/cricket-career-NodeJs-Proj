const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_bartika", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
