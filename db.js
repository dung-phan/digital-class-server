const Sequelize = require("sequelize");
const databaseURL =
  process.env.DATABASE_URL ||
  "postgres://postgres:pizza@192.168.99.100:5432/postgres";
const db = new Sequelize(databaseURL);

module.exports = db;
