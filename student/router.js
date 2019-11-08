const { Router } = require('express');
const Student = require('./model');
const Batch = require('../batch/model');
const authMiddleWare = require('../auth/middleware');

const router = new Router();

//get students for a certain class
router.get('/batches/:batchId/students', (req, res, next) => {
  Student.findAll({ where: { batchId: req.params.batchId } })
    .then(students => {
      res.send(students);
    })
    .catch(next);
});
//get a single student of a certain class
router.get('/batches/:batchId/students/:studentId', (req, res, next) => {
  Student.findOne({
    where: {
      id: req.params.studentId,
      batchId: req.params.batchId
    }
  })
    .then(student => {
      if (student) {
        res.send(student);
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

// // Add a new  student
router.post('/batches/:batchId/students', authMiddleWare, (req, res, next) => {
  Batch.findByPk(req.params.batchId)
    .then(batch => {
      if (!batch) {
        res.status(404).end();
      } else {
        Student.create({
          ...req.body,
          batchId: req.params.batchId
        }).then(student => {
          res.json(student);
        });
      }
    })
    .catch(next);
});
//edit a student
router.put(
  '/batches/:batchId/students/:studentId',
  authMiddleWare,
  (req, res, next) => {
    Student.findOne({
      where: {
        id: req.params.studentId,
        batchId: req.params.batchId
      }
    })
      .then(student => {
        if (student) {
          student.update(req.body).then(student => res.json(student));
        } else {
          res.status(404).end();
        }
      })
      .catch(next);
  }
);
// delete a student
router.delete(
  '/batches/:batchId/students/:studentId',
  authMiddleWare,
  (req, res, next) => {
    Student.destroy({
      where: {
        id: req.params.studentId,
        batchId: req.params.batchId
      }
    })
      .then(numDeleted => {
        if (numDeleted) {
          res.status(204).end();
        } else {
          res.status(404).end();
        }
      })
      .catch(next);
  }
);

module.exports = router;
