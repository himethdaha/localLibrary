const mongoose = require('mongoose')
const {DateTime} = require('luxon')
const dt = DateTime.fromISO(new Date().toISOString())


const Schema = mongoose.Schema

const bookInstanceSchema = new Schema({
    book:{type:Schema.Types.ObjectId,required:true,ref:'Book'},
    imprint:{type:String,required:true},
    status:{type:String,required:true,enum:['Available','Loaned','Reserved','Maintenance'], default:'Maintenance'},
    due_back:{type:String,default:Date.now}
})

bookInstanceSchema.virtual('url').get(function(){
    return `catalog/bookInstance/${this._id}`
})

bookInstanceSchema.virtual('due_back_formatted').get(function(){
    return dt.toLocaleString(DateTime.DATETIME_MED)
})

module.exports = mongoose.model('bookInstance',bookInstanceSchema)