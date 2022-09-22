const Book = require('../models/book')
const BookInstance = require('../models/bookInstance')
const Author = require('../models/author')
const Genre = require('../models/genre')

const async = require('async')
const bookinstance = require('../models/bookInstance')

//Will be the sites Index page
exports.index=(req,res)=>{
    async.parallel({
        //function to get the book counts
        book_count(callback)
        {
            Book.countDocuments({},callback)
        },
        //function to get the book instance counts
        bookInstance_count(callback)
        {
            BookInstance.countDocuments({},callback)
        },
        //function to get the available book instance counts
        bookinstance_available_count(callback)
        {
            BookInstance.countDocuments({status:"Available"},callback)
        },
        //function to get the author counts
        author_count(callback)
        {
            Author.countDocuments({},callback)
        },
        //function to get the genre counts
        genre_count(callback)
        {
            Genre.countDocuments({},callback)
        }
    },
        //Ending callback
        (err,results) =>{
            res.render('index',{
                title:'Welcome to the Local Library Home',
                error:err,
                data:results
            })
        }
    )
}
//Display the list of all books
exports.book_list=(req,res,next)=>{
    //Find all books by title and author, then sort alphhabetically and populate the author
    Book.find({},"title author").sort({title:1}).populate("author").exec((err,list_of_books)=>{
        //If an error occurs pass it to express 
        if(err)
        {
            next(err)
        }
        res.render("bookList",{title:"Book List",book_list:list_of_books})
    })
}
//Display the details of an book
exports.book_detail=(req,res)=>{
    res.send(`Details of book with the ID of ${req.params.id}`)
}
//Display book create form
exports.book_create_get=(req,res)=>{
    res.send(`book create form GEt`)
}
//Handle book create form
exports.book_create_post=(req,res)=>{
    res.send(`book create form POST`)
}
//Display book delete form
exports.book_delete_get=(req,res)=>{
    res.send(`book delete form GET`)
}
//Handle book delete form
exports.book_delete_post=(req,res)=>{
    res.send(`book delete form POST`)
}
//Display book update form
exports.book_update_get=(req,res)=>{
    res.send(`book update form GET`)
}
//Handle book update form
exports.book_update_post=(req,res)=>{
    res.send(`book update form POST`)
}
