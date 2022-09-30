const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{type:String, minLength:3,required:true},
    password:{type:String, minLength:8,required:true}
})

module.exports = mongoose.model('User',userSchema)