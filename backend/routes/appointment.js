'use strict'


const express = require('express')
const api = express.Router();

const appointment_controller = require('../controllers/appointment')
const user_controller = require('../controllers/user')

const md_auth = require("../middlewares/authenticated")

api.post('/apppointments',md_auth.authenticate,appointment_controller.appointmentspost)
api.get('/administration',md_auth.authenticate,appointment_controller.showallapppintments);
api.get('/getapp',md_auth.authenticate,appointment_controller.gettapps);
api.get('/deleteapp/:id',md_auth.authenticate,appointment_controller.deleapp)
api.get('/editapp/:id',md_auth.authenticate,appointment_controller.editapp)
api.post('/editappointment/:id',md_auth.authenticate,appointment_controller.update)
api.get('/cancel/:id',md_auth.authenticate,appointment_controller.generatecancel)

api.get('/getcancels',md_auth.authenticate,appointment_controller.showcancels)
api.get('/deleteall/:id',md_auth.authenticate,appointment_controller.deleteall)

module.exports = api