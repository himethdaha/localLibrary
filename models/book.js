const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title:{type:String,required:true},
    author:{type:Schema.Types.ObjectId,required:true,ref:'Author'},
    genre:[{type:Schema.Types.ObjectId, ref:'Genre'}],
    ISBN: {type:String,required:true},
    summary:{type:String,required:true}
})

bookSchema.virtual('url').get(function(){
    return `catalog/book/${this._id}`
})

module.exports = mongoose.model('Book',bookSchema)