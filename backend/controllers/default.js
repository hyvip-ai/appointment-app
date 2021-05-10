'use strict'

function status(req,res){
    return res.send({name:'Appointmnet app',
                    version:"1.0.0",
                    Author:'Rajat',
                    Status:'Thomke thomke cholche thik amar jiboner moton'})
}

module.exports = {
    status
}