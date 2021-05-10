'use strict'

const Appointment = require('../models/appointment');

const Cancel = require('../models/cancelling');
function appointmentspost(req,res){
    const params = req.body;
    if(params.email && params.name && params.date){
        var appointment = new Appointment();
        appointment.name = params.name;
        appointment.email = params.email;
        appointment.date = params.date;
      Appointment.find({date:params.date}).exec((err,appointments)=>{
          if(err){
              return res.send({messege:'Finding Appointment error'})
          }
          if(appointments.length==10){
            return res.send({messege:'Already 10 appointment booked for this day'})
          }
          if(appointments.length>=1){

            Appointment.findOne({email:params.email,date:params.date,name:params.name}).exec((err,found)=>{
                if(err){
                    return res.send({messege:'Finding Error'})
                }
                if(found){
                    // console.log(found);
                    return res.send({messege:'Already Booked for the same person on the same day'})
                }
                else{
                    
                            appointment.save((err,saveappointment)=>{
                                if(err){
                        return res.send({messege:'appointment saving error'})
                                }
                                if(saveappointment){
                        return res.send({Appointment:saveappointment,
                                        messege:'Appointment Booked'})
        
                                }
                            })
                      
                }
            })
          
          }
          else{
                 
            appointment.save((err,saveappointment)=>{
                if(err){
        return res.send({messege:'appointment saving error'})
                }
                if(saveappointment){
        return res.send({Appointment:saveappointment,
                        messege:'Appointment Booked'})

                }
            })
          }
      })
    }
  
    else{
        return res.send({messege:'Invalid Data'});
    }
}

function showallapppintments(req,res){
    Appointment.find({}).exec((err,data)=>{
        if(err){
            return res.send({messege:'finding error'})
        }
        // console.log(data);
        return res.send(data);
    })
    // return res.send({messege:"all good bro"})
}

function gettapps(req,res){
    var email = req.user.email;
    Appointment.find({email:email}).exec((err,appointments)=>{
        if(err){
            return res.send({messege:'Finding Email Error'})
        }
        if(appointments){
            return res.send(appointments);
        }
    })
}
function deleapp(req,res){
    var id = req.params.id;
    // console.log(id)
    Appointment.find({_id:id}).remove().exec((err,done)=>{
        if(err){
            return res.send({messege:'error while deleting'})

        }
        if(done){
            return res.send({messege:'Appointment Deleted'})
        }
    })
}

function editapp(req,res){
    var id = req.params.id

    Appointment.find({_id:id}).exec((err,appointment)=>{
        if(err){
            return res.send({messege:'error while finding'})

        }
        return res.send({appointment:appointment});
    })
}

function update(req,res){
    const params = req.body
    var myid = req.params.id
    console.log(myid)
    if(params.date && params.name && params.email){
        Appointment.find({_id:myid}).exec((err,appointment)=>{
            if(err){
                return res.send({messege:'error while deleting'})
    
            }
            if(appointment){
                // return res.send({messege:'Appointment Deleted'})
        
                if(appointment[0].name == params.name && appointment[0].date==params.date && appointment[0].email == params.email){
                    return res.send({messege:`Change Something to edit it or press cancel`})
                }
                else{
                    Appointment.find({date:params.date}).exec((err,appointments)=>{
                        if(err){
                            return res.send({messege:'Findign error'})
                        }
                        if(appointments.length==10){
                            return res.send({messege:'Already 10 appointment booked for this day'})
                        }
                        else{
                            Appointment.find({_id:myid}).remove().exec((err,done)=>{
                                if(err){
                            return res.send({messege:'Findign error'})

                                }
                                if(done){
                                    appointmentspost(req,res)

                                }
                            })
                        }
                    })
                }

            }
        })
    }

}

function generatecancel(req,res){
    var myid  = req.params.id;

    Appointment.findOne({_id:myid}).exec((err,appointments)=>{
        if(err){
            return res.send({messege:'Finding error'})
        }
        if(appointments){
            var cancel = new Cancel();
            // console.log(appointments)
            // return res.send({appointment:appointments})
            cancel.name = appointments.name;
            cancel.email = appointments.email;
            cancel.date = appointments.date;
            Cancel.findOne({email:appointments.email,name:appointments.name,date:appointments.date}).exec((err,found)=>{
                if(err){
                    return res.send({messege:'FInding Error'})
                }
                if(found){
                    return res.send({messege:'Aleady in the pending List'})
                }
                else{
                    cancel.save((err,savedcancel)=>{
                        if(err){
                            return res.send({messege:"Finding Error"})
                        }
                        if(savedcancel){
                            return res.send({cancel:savedcancel,
                                             messege:"Request Sent"})
                        }
                    })
                }
                
            })
        }
    })
}

function showcancels(req,res){
    Cancel.find({}).exec((err,cancels)=>{
        if(err){
            return res.send({messege:'error finding'})
        }
        if(cancels){
            // console.log(cancels)
            // console.log(cancels)
            return res.send(cancels)
        }
    })
}

function deleteall(req,res){
    var myid = req.params.id
    // console.log(myid)
    Cancel.findOne({_id:myid}).exec((err,found)=>{
        if(err){
            return res.send({messege:'Finding Error'})
        }
        if(found){
            console.log(found)
            Appointment.findOne({email:found.email,name:found.name,date:found.date}).exec((err,app)=>{
                if(err){
                    return res.send({messege:'Not Found'})
                }
                if(app){
                    console.log(app);
                   console.log({id:app._id})
                   Appointment.findOne({_id:app._id}).remove().exec((err,done)=>{
                       if(err){

                       }
                       if(done){
                           Cancel.findOne({_id:myid}).remove().exec((err,done)=>{
                               if(err){
                    return res.send({messege:'Not Found'})

                               }
                               if(done){
                    return res.send({messege:'Booking Cancel'})

                               }
                           })
                       }
                   })
                }
            })
        }
    })
}

module.exports = {
    appointmentspost,
    gettapps,
    showallapppintments,
    deleapp,
    editapp,
    update,
    generatecancel,
    showcancels,
    deleteall
}