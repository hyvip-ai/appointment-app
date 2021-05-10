'use strict'

const express = require('express')
const api = express.Router();
const user_controller = require('../controllers/user');
const user = require('../models/user');
const md_auth = require('../middlewares/authenticated')
api.post('/register',user_controller.signup);
api.post('/login',user_controller.login);
api.get('/dashboard',md_auth.authenticate,user_controller.getuser);

module.exports = api