const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username:{type:String, minLength:3,required:true},
    password:{type:String, minLength:8,required:true}
})

userSchema.pre('save',function(next){
    let user = this;

    bcrypt.hash(user.password,10,function(err,hash){
        if(err)
        {
            return next(err)
        }
        user.password = hash
        next()

    })

})
userSchema.methods.comparePassword = async function(userPassword,dbPassword)
{
   return await bcrypt.compare(userPassword,dbPassword)
}

module.exports = mongoose.model('User',userSchema)