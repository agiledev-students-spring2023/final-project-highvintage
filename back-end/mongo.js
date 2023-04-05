const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:secret@localhost:27017/')
.then(()=>{
    console.log("mongodb successfully connected")
})
.catch(()=>{
    console.log('mongodb failed')
})

const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports = collection