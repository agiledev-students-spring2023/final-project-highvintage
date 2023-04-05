const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:secret@localhost:27017/')
.then(()=>{
    console.log("successfully connected")
})
.catch(()=>{
    console.log('failed')
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