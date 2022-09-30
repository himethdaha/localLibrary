const User = require('../models/user')
const {body,validationResult} = require('express-validator')

//User Sign up
exports.signup_get=(req,res,next)=>{
    res.render('userSignIn_form',{
        title:'User SignUp Form'
    })
}
exports.signup_post=[
    //Validate and sanitize username and password
    body('username','username is required').trim().isLength({min:1}).escape(),
    body('password').trim().isLength({min:8}).withMessage('Password requires a minimum of 8 characters'),

    (req,res,next)=>{
        //Save errors in a variable
        const errors = validationResult(req)

        //Create a user object
        const user = new User({
            username:req.body.username,
            password:req.body.password
        });

        //If errors are present re-render form with errors
        if(!errors.isEmpty())
        {
            res.render('userSignIn_form',{
                title:'User SignUp Form',
                errors:errors.array()
            });
            return
        }
        

         //If data is valid
        user.save((err)=>{
            if(err)
            {
                return next(err)
            }
                res.redirect('/')
        })
        
    }

]
