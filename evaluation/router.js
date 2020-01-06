const { Router } = require("express");
const Evaluation = require("./model");
const Student = require("../student/model");
const authMiddleWare = require("../auth/middleware");

const router = new Router();
//get evaluations of a student in a certain class
router.get(
  "/batches/:batchId/students/:studentId/evaluations",
  (req, res, next) => {
    Evaluation.findAll({
      where: { batchId: req.params.batchId, studentId: req.params.studentId }
    })
      .then(evaluations => {
        res.send(evaluations);
      })
      .catch(next);
  }
);
//get evaluations of a certain batch
router.get("/batches/:batchId/evaluations", (req, res, next) => {
  Evaluation.findAll({
    where: { batchId: req.params.batchId }
  })
    .then(evaluations => {
      res.send(evaluations);
    })
    .catch(next);
});

//post an evaluation to a student
router.post(
  "/batches/:batchId/students/:studentId/evaluations",
  (req, res, next) => {
    Student.findByPk(req.params.studentId)
      .then(student => {
        if (!student) {
          res.status(404).end();
        } else {
          Evaluation.create({
            ...req.body,
            studentId: req.params.studentId,
            batchId: req.params.batchId
          }).then(evaluation => {
            res.json(evaluation);
          });
        }
      })
      .catch(next);
  }
);
module.exports = router;
