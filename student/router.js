const { Router } = require('express');
const Student = require('./model');
const Batch = require('../batch/model');

const router = new Router();

router.get('/students', (req, res, next) => {
  Student.findAll()
    .then(students => {
      res.send(students);
    })
    .catch(next);
});

router.get('/students/:id', (req, res, next) => {
  Student.findByPk(req.params.id, { include: [Batch] })
    .then(student => {
      res.send(student);
    })
    .catch(next);
});

// // Add a new  student
router.post('/students', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.json(student))
    .catch(next);
});
//edit a student

router.put('/students/:studentId', (req, res, next) => {
  Student.findByPk(req.params.studentId)
    .then(student => {
      if (student) {
        student.update(req.body).then(student => res.json(student));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});
// delete a student
router.delete('/students/:studentId', (req, res, next) => {
  Student.destroy({
    where: {
      id: req.params.studentId
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
});

module.exports = router;
