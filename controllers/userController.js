const User = require('../models/user')
const Book = require('../models/book')

const {body,validationResult} = require('express-validator')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


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
                res.redirect('/login')
        })
        
    }

]



exports.login_get=(req,res,next)=>{
    res.render('userLogIn_form',{
        title:'User LogIn Form'
    })
}


//For user Authentication
passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

exports.login_post=[
    passport.authenticate('local',{
        failureRedirect:'/users/login', 
        failureMessage:true,
        successRedirect:'/'
    })
]

//User logout
exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err)
        }
        res.redirect('/')
    })
    
}
   
