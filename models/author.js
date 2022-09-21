const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authorSchema = new Schema({
    first_name:{type:String, required:true, maxLength:100},
    last_name:{type:String, required:true, maxLength:100},
    dob:{type:Date},
    dod:{type:Date}
})

authorSchema.virtual("fullName").get(function(){
    //If the author does't have a first or last name in the db
    let fullName = ""

    if(!this.first_name || this.last_name)
    {
        fullName = ""
    }
    else
    {
        fullName = `${this.first_name} ${this.last_name}`
    }

    return fullName


})

authorSchema.virtual("url").get(function(){
    return `catalog/author/${this._id}`
})

module.exports = mongoose.model('Author',authorSchema)