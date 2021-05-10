'use strict'

const mongoose = require('mongoose')

const schema = mongoose.Schema

const appointmentschema = schema({
    date:String,
    name:String,
    email:String
})

module.exports = mongoose.model('Cancel',appointmentschema);