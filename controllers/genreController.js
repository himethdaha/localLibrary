const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')
const {body, validationResult} = require('express-validator')


//Display the list of all genres
exports.genre_list=(req,res,next)=>{
    Genre.find().sort([['name','ascending']]).exec(function(err,list_of_genres){
        //If an error occurs pass the error to be handled by express
        if(err)
        {
            return next(err)
        }
        res.render('genreList',{
            title:'Genre List',
            genre_list:list_of_genres
        })
    })
}
//Display the details of a genre
exports.genre_detail=(req,res)=>{
    //kick off finding genre and books based on the id param passed at the same time
    async.parallel({
        genre(callback)
        {
            Genre.findById(req.params.id).exec(callback)
        },
        genre_books(callback)
        {
            Book.find({genre:req.params.id}).exec(callback)
        },
    },
    (err,results)=>{
        //If an error occurs pass it to express
        if(err)
        {
            return next(err)
        }
        //If no genre was found
        if(results.genre===null)
        {
            //Create an error and pass it to express
            const err = new Error(`No genre found`)
            err.status = 404
            return next(err)
        }
        //If genre and books were found
        res.render('genreDetails',{
        title: "Genre Details",
        genre:results.genre,
        genre_books:results.genre_books,
    })
    }
    )
}
//Display genre create form
exports.genre_create_get=(req,res)=>{
    res.render("genreCreate_form",{title:'Create Genre'})
}
//Handle genre create form
//Route is passed an array of middlewares
exports.genre_create_post=[
    //Validate and sanitize the field
    body("name", "Genre name is required").trim().isLength({min:1}).escape(),

    //Process the request after validating and sanitization
    (req,res,next)=>{
        //Extract validation errors from the request
        const errors = validationResult(req)

        //Object with the sanitized genre name
        const genre = new Genre({name:req.body.name})

        //If there are errors render the form again
        if(!errors.isEmpty())
        {
            res.render("genreCreate_form",{
                title:'Create Genre',
                genre,
                //To loop over the errors in the view
                errors:errors.array()
            })
            return
        }
        else
        {
            //If there are no errors
            //Check if the genre already exists
            Genre.findOne({name:req.body.name}).exec((err,genre_found)=>{
                //If an error is found pass it to express
                if(err)
                {
                    return next(err)
                }

                //If the genre is found redirect the user to the genreDetails
                if(genre_found)
                {
                    res.redirect(genre_found.url)
                }
                //If no errors and no genre found save the new genre
                else
                {
                    genre.save((err)=>{
                        if(err)
                        {
                            return next(err)
                        }
                        //Genre is saved and redirect the user to the details page of the genre
                        res.redirect(genre.url)
                    })
                }
            })
        }
    }
]
//Display genre delete form
exports.genre_delete_get=(req,res,next)=>{
    async.parallel({
        genre(callback)
        {
            Genre.findById(req.params.id).exec(callback)
        },
        //FInd the books referencing the genre
        genre_books(callback)
        {
            Book.find({genre:req.params.id}).exec(callback)
        }
    },
    (err,results)=>{
        //If an error occurs pass it to express
        if(err)
        {
            return next(err)
        }
        //If the request was valid but couldn't find any genres in the db
        if(results.genre == null)
        {
            res.redirect('/catalog/genres')
        }
        res.render('genreDelete_form',{
            title:'Delete Genre',
            genre:results.genre,
            books:results.genre_books
        })
    }
    )
}
//Handle genre delete form
exports.genre_delete_post=(req,res,next)=>{
    async.parallel({
        genre(callback)
        {
            Genre.findById(req.params.id).exec(callback)
        },
        genre_books(callback)
        {
            Book.find({genre:req.params.id}).exec(callback)
        }
    },
    (err,results)=>{
        if(err)
        {
            return next(err)
        }
        //If books were referencing the genre, render the form and end cycle
        if(results.genre_books.length > 0)
        {
            res.render('genreDelete_form',{
                title:'Delete Genre',
                genre:results.genre,
                books:results.genre_books
            })

            return
        }

        Genre.findByIdAndDelete(results.genre._id,(err)=>{
            if(err)
            {
                return next(err)
            }
            res.redirect('/catalog/genres')
        })
    }
    )
}
//Display genre update form
exports.genre_update_get=(req,res)=>{
    res.send(`Genre update form GET`)
}
//Handle genre update form
exports.genre_update_post=(req,res)=>{
    res.send(`Genre update form POST`)
}
