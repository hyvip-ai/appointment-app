const jwt = require('jwt-simple')
const secret = "My_Secret_1-2-3"
function authenticate(user){
    var payload = {
        name : user.name,
        username : user.username,
        email  :user.email,
        password : user.password,
        sub : user._id

    }
    const token = jwt.encode(payload,secret)
    return token
}

module.exports = {
    authenticate
}