const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


const server = express();

server.use(morgan('dev'))
server.use(express.json())
server.use(helmet())
server.use(cors)


server.get('/', (req, res) => {
    res.send.json({
        message: 'Welcome to the API!'
    })
})

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: 'Something went wrong'
    })
})

module.exports = server