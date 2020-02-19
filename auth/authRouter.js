const express = require('express');
const usersModel = require('../users/usersModel');
const bcrypt = require('bcryptjs');
const router = express.Router();
const authCheck = require('../middlewares/authCheck')

router.post("/register", async (req, res, next) => {
  try {
    const saved = await usersModel.add(req.body);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersModel.findBy({ username }).first();
    const passwordValid = await bcrypt.compareSync(password, user.password);

    if (user && passwordValid) {
      req.session.loggedin = true;
      res.status(200).json({
        message: `Welcome ${username}`
      });
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/restricted", async (req, res, next) => {
  try {
    res.json({
      message: "You are authorized"
    });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    } else {
      res.json({
        message: "You are logged out."
      });
    }
  });
});




module.exports = router;
