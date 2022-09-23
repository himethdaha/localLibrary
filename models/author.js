const mongoose = require('mongoose')
const {DateTime} = require('luxon')

const Schema = mongoose.Schema

const authorSchema = new Schema({
    first_name:{type:String, required:true, maxLength:100},
    family_name:{type:String, required:true, maxLength:100},
    date_of_birth:{type:Date},
    date_of_death:{type:Date}
})

authorSchema.virtual("fullName").get(function(){
    //If the author does't have a first or last name in the db
    let fullName = ""

    if(!this.first_name || this.family_name)
    {
        fullName = ""
    }
    else
    {
        fullName = `${this.first_name} ${this.family_name}`
    }

    return fullName


})

authorSchema.virtual("url").get(function(){
    return `/catalog/author/${this._id}`
})

authorSchema.virtual("date_of_birth_formatted").get(function(){
    //If dob is not found return an empty string if not return dob 
    return this.date_of_birth? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED):''
})

authorSchema.virtual("date_of_death_formatted").get(function(){
    //If dod is not found return an empty string if not return dod
    return this.date_of_death?DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED):''
})
module.exports = mongoose.model('Author',authorSchema)