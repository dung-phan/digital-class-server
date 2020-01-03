const Sequelize = require("sequelize");
const db = require("../db");

const Batch = db.define("batch", {
  batchNumber: {
    type: Sequelize.STRING,
    field: "Batch Number",
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATEONLY,
    field: "Start Date",
    defaultValue: Sequelize.NOW
  },
  endDate: {
    type: Sequelize.DATEONLY,
    field: "End Date",
    defaultValue: Sequelize.NOW
  }
});

module.exports = Batch;
