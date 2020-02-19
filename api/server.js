const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('../users/userRouter');
const authRouter = require('../auth/authRouter');
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

const sessionConfig = {
    name: "cookies",
    secret: "keep it secret, keep it safe!",
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
      knex: require('../data/dbConfig'),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60
    })
  };

  server.use(session(sessionConfig));

  server.use('/api/users', userRouter);
  server.use('/api/auth', authRouter);
  

server.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my API'
    })
})

server.use((err, req, res, next) =>{
    console.log('Error:', err)
    res.status(500).json({
        message: 'Something went Wrong'
    })
})
module.exports = server;
