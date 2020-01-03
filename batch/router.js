const { Router } = require("express");
const Batch = require("./model");
const authMiddleWare = require("../auth/middleware");

const router = new Router();

router.get("/batches", (req, res, next) => {
  Batch.findAll()
    .then(batches => {
      res.send(batches);
    })
    .catch(next);
});

router.get("/batches/:batchId", (req, res, next) => {
  Batch.findByPk(req.params.batchId)
    .then(batch => {
      res.send(batch);
    })
    .catch(next);
});
7;
// Create a new class
router.post("/batches", (req, res, next) => {
  Batch.create(req.body)
    .then(batch => res.json(batch))
    .catch(next);
});

//Update a class
router.put("/batches/:batchId", authMiddleWare, (req, res, next) => {
  Batch.findOne({
    where: {
      batchId: req.params.batchId
    }
  })
    .then(batch => {
      if (batch) {
        batch.update(req.body).then(batch => res.json(batch));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});
//Delete a batch
router.delete("/batches/:id", (req, res, next) => {
  Batch.destroy({
    where: {
      id: req.params.id
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
