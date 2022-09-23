const Book = require('../models/book')
const BookInstance = require('../models/bookInstance')
const Author = require('../models/author')
const Genre = require('../models/genre')

//Display the list of all book instances
exports.bookInstance_list=(req,res,next)=>{
    //Find all book instances and populate the book id with actual data
    BookInstance.find().populate("book").exec((err,list_of_bookInstances)=>{
        //If an error occurs pass the error to express
        if(err)
        {
         return next(err)
        }
        res.render("bookInstance",{
            title:"All Book Copies",
            bookListInstances:list_of_bookInstances
        })
    })
}
//Display the details of a bookinstance
exports.bookInstance_detail=(req,res)=>{
    res.send(`Details of bookinstance with the ID of ${req.params.id}`)
}
//Display bookinstance create form
exports.bookInstance_create_get=(req,res)=>{
    res.send(`bookinstance create form GEt`)
}
//Handle bookinstance create form
exports.bookInstance_create_post=(req,res)=>{
    res.send(`bookinstance create form POST`)
}
//Display bookinstance delete form
exports.bookInstance_delete_get=(req,res)=>{
    res.send(`bookinstance delete form GET`)
}
//Handle bookinstance delete form
exports.bookInstance_delete_post=(req,res)=>{
    res.send(`bookinstance delete form POST`)
}
//Display bookinstance update form
exports.bookInstance_update_get=(req,res)=>{
    res.send(`bookinstance update form GET`)
}
//Handle bookinstance update form
exports.bookInstance_update_post=(req,res)=>{
    res.send(`bookinstance update form POST`)
}
