const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/signup", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Please supply a valid email and password"
    });
  }
  const user = {
    email: req.body.email,

    password: bcrypt.hashSync(req.body.password, 10)
  };

  User.create(user)
    .then(user => {
      res.status(201).send("user created");
    })
    .catch(next);
});

module.exports = router;
