const Sequelize = require('sequelize');
const db = require('../db');

const Batch = db.define('batch', {
  batchNumber: {
    type: Sequelize.STRING,
    field: 'Batch Number',
    allowNull: false
  },
  startDate: {
    type: Sequelize.STRING,
    field: 'Start Date'
  },
  endDate: {
    type: Sequelize.STRING,
    field: 'End Date'
  }
});

module.exports = Batch;
