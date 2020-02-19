const express = require('express')
const userModel = require('./usersModel')

const router = express.Router;

router.get('/users', async (req, res, next) => {
    try {
        const users = await userModel.find();
        res.json(users)
    }catch(err) {
        next()
    }
})

router.post('/login', async(req, res, next) => {
    try {
        const { username, password } = req.body;
    const user = await userModel.findBy({ username }).first();
    const passwordValid = await bcrypt.compareSync(password, user.password);

    if (user && passwordValid) {
      req.session.user = user;
      res.status(200).json({
        message: `Welcome ${username}`
      });
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
    }catch(err) {
        next(err)
    }
})

router.post('/register', async(req, res, next) => {
    try {
        const saved = await db.add(req.body);
    res.status(201).json(saved);
    }catch(err) {
        next(err)
    }
})

router.get("/restricted", restricted(), async (req, res, next) => {
    try {
      res.json({
        message: "You are authorized"
      });
    } catch (err) {
      next(err);
    }
  });
  
  router.get("/logout", restricted(), (req, res, next) => {
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