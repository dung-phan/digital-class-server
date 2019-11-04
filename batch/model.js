const Sequelize = require('sequelize');
const db = require('../db');

const Batch = db.define('batch', {
  batchNumber: {
    type: Sequelize.INTEGER,
    field: 'Batch Number',
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE,
    field: 'Start Date',
    defaultValue: Sequelize.NOW
  },
  endDate: {
    type: Sequelize.DATE,
    field: 'End Date',
    defaultValue: Sequelize.NOW
  }
});

module.exports = Batch;
