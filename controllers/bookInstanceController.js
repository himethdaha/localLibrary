const Book = require('../models/book')
const BookInstance = require('../models/bookInstance')
const Author = require('../models/author')
const Genre = require('../models/genre')
const book = require('../models/book')
const {body,validationResult} = require('express-validator')
const async = require('async')

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
exports.bookInstance_detail=(req,res,next)=>{
    //Find the bookInstance by id and populate the book
    BookInstance.findById(req.params.id).populate('book').exec((err,bookInstance)=>{
        if(err)
        {
            return next(err)
        }
        //If no bookInstances
        if(bookInstance === null)
        {
            const err = new Error(`No book instance to be found`)
            err.status = 404
            return next(err)
        }
        res.render("bookInstanceDetails",{
            title:`Copies of ${bookInstance.book.title}`,
            bookInstance:bookInstance
        })
    })
}
//Display bookinstance create form
exports.bookInstance_create_get=(req,res,next)=>{
    //Find the books associated with the bookInstance
    async.parallel({
        books(callback)
        {
            Book.find(callback)
        }
    },
    (err,results)=>{
        //If errors occured while finding books
        if(err)
        {
            return next(err)
        }
        //Render the form with the books
        res.render('bookInstance_create',{
            title:'BookInstance Create',
            books:results.books
        })
    }
    )
}
//Handle bookinstance create form
exports.bookInstance_create_post=[
    //Validate and sanitize the data
    body('book',"Book title is required").trim().isLength({min:1}).escape(),
    body('imprint',"Imprint is required").trim().isLength({min:5}).escape(),
    body('status',"Status required").trim().escape(),
    body('due_back',"Due Date required").trim().isISO8601().toDate().escape(),

    (req,res,next)=>{
        //Store errors in a variable
        const errors = validationResult(req)

        //Create a bookInstance object
        const bookinstance = new BookInstance({
            book:req.body.book,
            imprint:req.body.imprint,
            status:req.body.status,
            due_back:req.body.due_back,

        });

        //If validation errors were found
        if(!errors.isEmpty())
        {
            //Re-render the form with user enterd values sanitized
            async.parallel({
                books(callback)
                {
                    Book.find(callback)
                }
            },
            //If errors occured while finding book
            (err,results)=>{
                if(err)
                {
                    //Pass the error to express
                    return next(err)
                }
                //render the form with values
                res.render('bookInstance_create',{
                    title:'BookInstance Create',
                    books:results.books,
                    selected_book:bookinstance.book._id,
                    selected_status:bookinstance.status,
                    errors:errors.array(),
                    bookinstance

                });
            }
            )
            return;
        }

        //If data valid save to db
        bookinstance.save((err)=>{
            if(err)
            {
                return next(err)
            }
            res.redirect(bookinstance.url)
        })

    }
]
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
