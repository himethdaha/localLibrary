const Author = require("../models/author")
const Book = require("../models/book")
const async = require('async')
const book = require("../models/book")
const {body,validationResult} = require("express-validator")

//Display the list of all authors
exports.author_list = (req,res,next)=>{
    //Find all authors and sort them in ascending order based on their first name
    Author.find().sort([['first_name','ascending']]).exec(function(err,list_of_authors){
        //If an error occurs pass the error to express
        if(err)
        {
            return next(err)
        }
        res.render('authorList', {
            title:'Author List',
            author_list:list_of_authors
        })
    })
}
//Display the details of an author
exports.author_detail=(req,res,next)=>{
    async.parallel({
        author(callback){
            Author.findById(req.params.id).exec(callback)
        },
        books(callback){
            Book.find({author:req.params.id}, "title summary").exec(callback)
        }
    },
    (err,results)=>{
        //If an error occurs pass the error to express
        if(err)
        {
            return next(err)
        }

        //If no authors were found
        if(results.author===null)
        {
            const err = new Error(`No authors found`)
            err.status = 404
            return next(err) 
        }
        res.render('authorDetails',{
            title:`${results.author.first_name} ${results.author.family_name}`,
            author:results.author,
            books:results.books
        })
    }
    )
}
//Display author create form
exports.author_create_get=(req,res)=>{
    res.render('authorCreate_form', {
        title:'Author Create'
    })
}
//Handle author create form
exports.author_create_post=[
    //Validate and sanitize the first name
    body("first_name").trim().isLength({min:2}).escape().withMessage("First name is required with at least 2 characters"),
    //Validate and sanitize the family name
    body("family_name").trim().isLength({min:1}).escape().withMessage("Family name is required"),
    //Validate and sanitize the date of birth
    //Checkfalsy accepts a null/empty string
    body("date_of_birth", "Invalid date entered").optional({checkFalsy:true}).isISO8601().toDate().trim(),
    //Validate and sanitize the date of death
    //Checkfalsy accepts a null/empty string
    body("date_of_death", "Invalid date entered").optional({checkFalsy:true}).isISO8601().toDate().trim(),

    (req,res,next)=>{
        //Get the errors through the request body
        const errors = validationResult(req)

        //Create an author object from the validated and sanitized date 
        const author = new Author({
            first_name:req.body.first_name,
            family_name:req.body.family_name,
            date_of_birth:req.body.date_of_birth,
            date_of_death:req.body.date_of_death
        })
        
        //If errors were found in the request body pass the errors to the form
        if(!errors.isEmpty())
        {
            res.render("authorCreate_form",
            {
                title: "Author Create",
                author,
                errors:errors.array()
            })
        }

        //If the date is valid, save to the database
        author.save((err)=>{
            //If errors were found pass it to express
            if(err)
            {
                return next(err)
            }
            //Redirect to the new created author details page
            res.redirect(author.url)

        })
    }

]
//Display author delete form
exports.author_delete_get=(req,res,next)=>{
    //Find author and books in parallel
    async.parallel({
        //Find the author through the id passed in the url parameter
        author(callback)
        {
            Author.findById(req.params.id).exec(callback)
        },
        books(callback)
        {
            //Get the books that reference author
            Book.find({author:req.params.id}).exec(callback)
        }
    },
    (err,results)=>{
        if(err)
        {
            return next(err)
        }
        //If the request was valid but couldn't find an author
        if(results.author == null)
        {
            res.redirect('/catalog/authors')
        }

        res.render('authorDelete_form',{
            title:'Delete Author',
            author:results.author,
            books:results.books
        })
    }
    )
}
//Handle author delete form
exports.author_delete_post=(req,res,next)=>{
    //Find the books referencing the author
    async.parallel({
        //Find the author through the id passed in the url parameter
        author(callback)
        {
            Author.findById(req.params.id).exec(callback)
        },
        //Find author and books in parallel
        books(callback)
        {
            Book.find({author:req.params.id}).exec(callback)
        }

    },
    (err,results)=>{
        if(err)
        {
            return next(err)
        }

        //If the request was succesful books were found
        if(results.books.length > 0)
        {
            res.render('authorDelete_form', {
                title: 'Delete Author',
                author:results.author,
                books:results.books
            })
            //End cycle
            return
        }

        //If author has no books, delete the author
        Author.findByIdAndDelete(results.author._id, (err)=>{
            if(err)
            {
                return next(err)
            }
            res.redirect('/catalog/authors')
        })

    }
    )
   
}
//Display author update form
exports.author_update_get=(req,res)=>{
    res.send(`Author update form GET`)
}
//Handle author update form
exports.author_update_post=(req,res)=>{
    res.send(`Author update form POST`)
}
