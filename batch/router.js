const { Router } = require('express');
const Batch = require('./model');
const Student = require('../student/model');
const authMiddleWare = require('../auth/middleware');

const router = new Router();

router.get('/batches', (req, res, next) => {
  Batch.findAll()
    .then(batches => {
      res.send(batches);
    })
    .catch(next);
});

router.get('/batches/:batchId', (req, res, next) => {
  Batch.findByPk(req.params.batchId, { include: [Student] })
    .then(batch => {
      res.send(batch);
    })
    .catch(next);
});

// Create a new class
router.post('/batches', authMiddleWare, (req, res, next) => {
  Batch.create(req.body)
    .then(batch => res.json(batch))
    .catch(next);
});

module.exports = router;
