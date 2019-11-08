const express = require('express');

//midlewares
const bodyParser = require('body-parser');
const cors = require('cors');
const bodyParserMiddleWare = bodyParser.json();
const corsMiddleWare = cors();

//router
const batchRouter = require('./batch/router');
const studentRouter = require('./student/router');
const evaluationRouter = require('./evaluation/router');
const userRouter = require('./user/router');
const authRouter = require('./auth/router');

//models and db

const Batch = require('./batch/model');
const Student = require('./student/model');
const Evaluation = require('./evaluation/model');
const db = require('./db');

//init
const app = express();
const port = process.env.PORT || 4000;
db.sync({ force: true })
  .then(() => {
    console.log('Database connected');
    const batchNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const batches = batchNumbers.map(batchNumber =>
      Batch.create({ batchNumber: batchNumber })
    );
    return Promise.all(batches);
  })
  .then(() => {
    const students = [
      { name: 'Mimi', batchId: 1 },
      { name: 'Wouter', batchId: 2 },
      { name: 'David', batchId: 1 },
      { name: 'Bram', batchId: 4 },
      { name: 'Lisa', batchId: 1 },
      { name: 'Miloud', batchId: 2 },
      { name: 'Violeta', batchId: 3 },
      { name: 'Johan', batchId: 4 },
      { name: 'Danny', batchId: 6 },
      { name: 'Rembert', batchId: 7 },
      { name: 'Kelley', batchId: 10 },
      { name: 'Jeroen', batchId: 4 },
      { name: 'Rein', batchId: 2 }
    ];

    const studentPromises = students.map(student => Student.create(student));
    return Promise.all(studentPromises);
  })
  .then(() => {
    const evaluations = [
      { studentId: 1, batchId: 1, date: '20-10-2019', color: 'green' },
      { studentId: 1, batchId: 1, date: '27-10-2019', color: 'green' },
      { studentId: 2, batchId: 2, date: '20-10-2019', color: 'yellow' },
      { studentId: 2, batchId: 2, date: '27-10-2019', color: 'red' },
      { studentId: 3, batchId: 1, date: '20-10-2019', color: 'green' },
      { studentId: 3, batchId: 1, date: '27-10-2019', color: 'yellow' },
      { studentId: 4, batchId: 4, date: '20-10-2019', color: 'yellow' },
      { studentId: 4, batchId: 4, date: '20-10-2019', color: 'yellow' },
      { studentId: 4, batchId: 4, date: '27-10-2019', color: 'yellow' },
      { studentId: 5, batchId: 1, date: '20-10-2019', color: 'green' },
      { studentId: 5, batchId: 1, date: '27-10-2019', color: 'yellow' },
      { studentId: 6, batchId: 2, date: '20-10-2019', color: 'green' },
      { studentId: 6, batchId: 2, date: '27-10-2019', color: 'green' },
      { studentId: 7, batchId: 3, date: '20-10-2019', color: 'red' },
      { studentId: 7, batchId: 3, date: '27-10-2019', color: 'green' },
      { studentId: 8, batchId: 4, date: '20-10-2019', color: 'red' },
      { studentId: 8, batchId: 4, date: '27-10-2019', color: 'yellow' },
      { studentId: 9, batchId: 6, date: '20-10-2019', color: 'yellow' },
      { studentId: 9, batchId: 6, date: '27-10-2019', color: 'green' },
      { studentId: 10, batchId: 7, date: '20-10-2019', color: 'green' },
      { studentId: 10, batchId: 7, date: '27-10-2019', color: 'yellow' },
      { studentId: 10, batchId: 7, date: '2-11-2019', color: 'red' },
      { studentId: 11, batchId: 10, date: '14-10-2019', color: 'green' },
      { studentId: 11, batchId: 10, date: '09-10-2019', color: 'green' },
      { studentId: 12, batchId: 2, date: '14-10-2019', color: 'green' },
      { studentId: 13, batchId: 2, date: '09-10-2019', color: 'green' },
      { studentId: 13, batchId: 2, date: '14-10-2019', color: 'green' }
    ];

    const evaluationPromises = evaluations.map(evaluation =>
      Evaluation.create(evaluation)
    );
    return Promise.all(evaluationPromises);
  })
  .catch(console.error);
app
  .use(corsMiddleWare)
  .use(bodyParserMiddleWare)
  .use(userRouter)
  .use(authRouter)
  .use(batchRouter)
  .use(studentRouter)
  .use(evaluationRouter)
  .listen(port, () => console.log('Server runing on port: ', port));
