const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('../student/model');
const Batch = require('../batch/model');
const Evaluation = db.define('evaluation', {
  date: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.ENUM('empty', 'green', 'red', 'yellow'),
    defaultValue: 'empty'
  },
  remark: {
    type: Sequelize.STRING
  }
});
Evaluation.belongsTo(Student);
Evaluation.belongsTo(Batch);
Student.hasMany(Evaluation);

module.exports = Evaluation;
