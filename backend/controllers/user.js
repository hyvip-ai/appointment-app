

const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user')

const jwt = require('../authentication/jwt')


function signup(req,res){
    const params = req.body;
    if(params.name && params.username && params.email && params.password){
            var user = new User()
            user.name = params.name;
            user.username = params.username;
            User.find({email:params.email}).exec((err,users)=>{
                if(err){
                    return res.send({messege:`Email searching error please try again`})
                }
                if(users && users.length >=1){
                    return res.send({messege:'Same email found in the database try with another one'})
                }
                else{
                    bcrypt.hash(params.password,null,null,(err,hash)=>{
                        if(err){
                            return res.send({messege:`Hash Making error please try again`})
                        }
                        user.password = hash
                        user.email = params.email
                    })
                    user.save((err,saveduser)=>{
                        if(err){
                            return res.send({messege:'error while saving the user'})
                        }
                        if(saveduser){
                            return res.send({user:saveduser,
                              messege:'Registration successful,Redirectiong to login page'})
                        }
                    })
                }
            })
    }
    else{
        return res.send({messege:'Invalid Data'})
    }
}


function login(req,res){
    const params = req.body;

    if(params.email && params.password){
        var password = params.password;
        var email = params.email;
        User.findOne({email:email},(err,user)=>{
            
            if(err){
                return res.send({messege:'finding email error'})
            }
            if(user){
                bcrypt.compare(password,user.password,(err,result)=>{
                    if(err){
                        return res.send({messege:'Password comparing error'})        
                    }       
                    if(result){
                        return res.send({token:jwt.authenticate(user),
                                         User:user,
                                          messege:'Login Success'})
                    }
                    else{
                        return res.send({messege:'wrong password'})
                    }
                })
            }
            else{
                return res.send({messege:'wrong email'})
            }
        })
    }
    else{
        return res.send({messege:"Invalid Data"})
    }

}

function getuser(req,res){
    // console.log(req.user)
    return res.send(req.user)

}
function logout(req,res){
    return res.send({messege:'Logout Successfully'})
}

module.exports = {
    signup,
    login,
    getuser
}