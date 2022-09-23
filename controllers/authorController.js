const Author = require("../models/author")
const Book = require("../models/book")
const async = require('async')
const book = require("../models/book")

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
    res.send(`Author create form GET`)
}
//Handle author create form
exports.author_create_post=(req,res)=>{
    res.send(`Author create form POST`)
}
//Display author delete form
exports.author_delete_get=(req,res)=>{
    res.send(`Author delete form GET`)
}
//Handle author delete form
exports.author_delete_post=(req,res)=>{
    res.send(`Author delete form POST`)
}
//Display author update form
exports.author_update_get=(req,res)=>{
    res.send(`Author update form GET`)
}
//Handle author update form
exports.author_update_post=(req,res)=>{
    res.send(`Author update form POST`)
}
