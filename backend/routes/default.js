'user strict'

const express = require('express')
const api = express.Router();
const default_controllers = require('../controllers/default')



api.get('/status',default_controllers.status)


module.exports = api