const express = require('express');
const authCheck = require('../middlewares/authCheck')
const usersModel = require('./usersModel');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await usersModel.find();

    res.json(users);
  } catch (err) {
    next();
  }
});

module.exports = router;

