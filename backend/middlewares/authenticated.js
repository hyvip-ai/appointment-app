'use strict'

const secret = "My_Secret_1-2-3"
const jwt = require('jwt-simple')
function authenticate(req,res,next){
    // console.log(`my token is :${req.headers.auth}`)
    var token = req.headers.auth
    // console.log
    var payload = jwt.decode(token,secret)

    req.user = payload
    next();

}

module.exports={
    authenticate
}