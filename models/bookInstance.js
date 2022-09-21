const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookInstanceSchema = new Schema({
    book:{type:Schema.Types.ObjectId,required:true,ref:'Book'},
    imprint:{type:String,required:true},
    status:{type:String,required:true,enum:['Available','Loaned','Reserved','Maintenance'], default:'Maintenance'},
    due_date:{type:String,default:Date.now}
})

bookInstanceSchema.virtual('url').get(function(){
    return `catalog/bookInstance/${this._id}`
})

module.exports = mongoose.model('bookInstance',bookInstanceSchema)