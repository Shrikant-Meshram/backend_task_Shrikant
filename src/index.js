const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./route/route')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))




mongoose.connect("mongodb+srv://Aditya1998:aadi1998@cluster0.zl7lv.mongodb.net/backend_tasks?retryWrites=true&w=majority",{
    useNewUrlParser:true
})
.then (() => console.log('mongoDB is connected '))
.catch(err => console.log(err))
app.use("/",router)

app.listen(process.env.PORT || 5000,function(){
    console.log("Express app running on PORT "+(process.env.PORT || 5000))
})