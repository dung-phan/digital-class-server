const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('../student/model');
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
Student.hasMany(Evaluation);
module.exports = Evaluation;
