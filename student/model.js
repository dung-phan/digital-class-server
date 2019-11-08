const Sequelize = require('sequelize');
const db = require('../db');
const Batch = require('../batch/model');

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg'
  }
});

Student.belongsTo(Batch);
Batch.hasMany(Student);

module.exports = Student;
