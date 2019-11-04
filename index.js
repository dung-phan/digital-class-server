const express = require('express');

//midlewares
const bodyParser = require('body-parser');
const cors = require('cors');
const bodyParserMiddleWare = bodyParser.json();
const corsMiddleWare = cors();
const authMiddleWare = require('./auth/middleware');
//router
const batchRouter = require('./batch/router');
const studentRouter = require('./student/router');
const userRouter = require('./user/router');
const authRouter = require('./auth/router');

//models and db

const Batch = require('./batch/model');
const Student = require('./student/model');
const db = require('./db');

//init
const app = express();
const port = process.env.PORT || 4000;
db.sync()
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
  .catch(console.error);
app
  .use(corsMiddleWare)
  .use(bodyParserMiddleWare)
  .use(userRouter)
  .use(authRouter)
  .use(batchRouter)
  .use(studentRouter)
  .listen(port, () => console.log('Server runing on port: ', port));
