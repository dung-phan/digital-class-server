const { Router } = require('express');
const Evaluation = require('./model');
const Student = require('../student/model');
const Batch = require('../batch/model');
const router = new Router();
//get all evaluations of a class
router.get('/evaluations/batches/:batchId', (req, res, next) => {
  Evaluation.findAll({
    where: { batchId: req.params.batchId }
  })
    .then(evaluations => {
      res.send(evaluations);
    })
    .catch(next);
});
//get evaluations of a student in a certain class

router.get(
  '/evaluations/batches/:batchId/students/:studentId',
  (req, res, next) => {
    Evaluation.findAll({
      where: { studentId: req.params.studentId, batchId: req.params.batchId }
    })
      .then(evaluations => {
        res.send(evaluations);
      })
      .catch(next);
  }
);
//post an evaluation to a student
router.post('/evaluations/students/:studentId', (req, res, next) => {
  Student.findByPk(req.params.studentId, { include: [Batch] })
    .then(student => {
      if (!student) {
        res.status(404).end();
      } else {
        Evaluation.create({
          ...req.body,
          studentId: req.params.studentId
        })
          .then(() => console.log('what is req.body', req.body))
          .then(evaluation => {
            res.json(evaluation);
          });
      }
    })
    .catch(next);
});
module.exports = router;
