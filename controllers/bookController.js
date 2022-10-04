const Book = require('../models/book')
const BookInstance = require('../models/bookInstance')
const Author = require('../models/author')
const Genre = require('../models/genre')

const async = require('async')
const bookinstance = require('../models/bookInstance')
const book = require('../models/book')
const {body,validationResult} = require('express-validator')

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
                data:results,
                user:req.user
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
            return next(err)
        }
        res.render("bookList",{title:"Book List",book_list:list_of_books})
    })
}
//Display the details of an book
exports.book_detail=(req,res,next)=>{
    async.parallel({
        //Find the book by id and populate the author and genre instead of just the ids
        book(callback){
            Book.findById(req.params.id).populate("author").populate("genre").exec(callback)
        },
        bookInstances(callback){
            BookInstance.find({book:req.params.id}).exec(callback)
        }
    },
    (err,results)=>{
        //If an error occurs pass it to express
        if(err)
        {
            return next(err)
        }
        if(results.book === null)
        {
            const err = new Error(`No books found`)
            err.status = 404
            return next(err)
        }
        res.render('bookDetails',{
            title:results.book.title,
            book:results.book,
            bookInstances:results.bookInstances
        })

    }
    )
}
//Display book create form
exports.book_create_get=(req,res,next)=>{
   //Get the author and genres of the book
   async.parallel({
    authors(callback)
    {
        Author.find(callback)
    },
    genres(callback)
    {
        Genre.find(callback)
    }
   },
   //If an error occurs while finding the author and genres, pass it to express
   (err,results)=>{
    if(err)
    {
        return next(err)
    }
    {
        res.render('bookCreate_form',{
            title:'Create book',
            authors:results.authors,
            genres:results.genres
        })
    }
   }
   )

}
//Handle book create form
exports.book_create_post=[
    //Convert the genres into an array to be used by the view 
    (req,res,next)=>{
        if(!Array.isArray(req.body.genre)){
            //When posting the form if it's the 1st post convert the genres to an array and if it's an update/delete/re-render keep it in the same type (array)
            req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre]
        }
        next()
    },

    //Validate and sanitize data
    body('title',"Title is required").trim().isLength({min:1}).escape(),
    body('author', "Author is required").trim().isLength({min:1}).escape(),
    //Sanitize each genre in the array
    body('genre.*').escape(),
    body('isbn', "ISBN is required").trim().isLength({min:4}).escape(),
    body('summary', 'Summary is required').trim().isLength({min:10}).escape(),

    (req,res,next)=>{
        //If there are validation errors, save them to a variable to be later displayed in the view
        const errors = validationResult(req)

        //Book object with the invalid data or valid data
        const book = new Book({
            title:req.body.title,
            author:req.body.author,
            genre:req.body.genre,
            isbn:req.body.isbn,
            summary:req.body.summary
        });

        //If errors were found
        if(!errors.isEmpty())
        {
            //Re-render the form with error messages and sanitized user values
            async.parallel({
                authors(callback)
                {
                    Author.find(callback)
                },
                genres(callback)
                {
                    Genre.find(callback)
                }
            },
            //If errors occured while finding, pass it to express
            (err,results)=>{
                if(err)
                {
                    return next(err)
                }

                //Mark the previously selected genres as checked
                for(const genre of results.genres)
                {
                    if(book.genre.includes(genre._id))
                    {
                        genre.checked = 'true'
                    }
                }

                //Render the form with the values/errors
                res.render('bookCreate_form',{
                    title:'Create Book',
                    authors:results.authors,
                    genres:results.genres,
                    book,
                    errors:errors.array()
                })
            }
            )
            return;
        }

        //If data is valid save the book to the database
        book.save((err)=>{
            if(err)
            {
                return next(err)
            }
            res.redirect(book.url)
        })
    }

]
//Display book delete form
exports.book_delete_get=(req,res,next)=>{
    async.parallel({
        book(callback)
        {
            Book.findById(req.params.id).exec(callback)
        },
        bookInstances(callback)
        {
            BookInstance.find({book:req.params.id}).exec(callback)
        },
    },
     (err,results)=>{
        if(err)
        {
            return next(err)
        }
        if(results.book == null)
        {
            res.redirect('/catalog/books')
        }
        res.render('bookDelete_form',{
            title:'Delete Book',
            book:results.book,
            bookInstances:results.bookInstances,
        })
     }
    )
}
//Handle book delete form
exports.book_delete_post=(req,res,next)=>{
    async.parallel({
        book(callback)
        {
            Book.findById(req.params.id).exec(callback)
        },
        bookInstances(callback)
        {
            BookInstance.find({book:req.params.id}).exec(callback)
        }
    },
    (err,results)=>{
        if(err)
        {
            return next(err)
        }
        if(results.bookInstances.length > 0)
        {
            res.render('bookDelete_form',{
                title:'Delete Book',
                book:results.book,
                bookInstances:results.bookInstances
            })
            return
        }
        Book.findByIdAndDelete(results.book._id,(err)=>{
            if(err)
            {
                return next(err)
            }
            res.redirect('/catalog/books')
        })
    }
    )
}
//Display book update form
exports.book_update_get=(req,res)=>{
    res.send(`book update form GET`)
}
//Handle book update form
exports.book_update_post=(req,res)=>{
    res.send(`book update form POST`)
}
