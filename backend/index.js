const express = require('express')
const app = express();
const mongodb = "mongodb://localhost:27017/myfirstapp"
const cors = require('cors')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')

const default_routes = require('./routes/default')
const user_routes = require('./routes/user')
const appointment_routes = require('./routes/appointment')
const port = 3000
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


mongoose.connect(mongodb , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>{
    app.listen(port,()=>{
        console.log('> Connected...')
        console.log("> everything connected run some code you moron")
    })
})
.catch(err=>console.log(`> Error while connecting to mongoDB: `+ err ))

app.use('/',default_routes)

app.use('/api',user_routes);

app.use('/api',appointment_routes);