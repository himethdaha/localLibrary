const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')
const mongoose = require('mongoose')
//Display the list of all genres
exports.genre_list=(req,res,next)=>{
    Genre.find().sort([['name','ascending']]).exec(function(err,list_of_genres){
        //If an error occurs pass the error to be handled by express
        if(err)
        {
            next(err)
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
            next(err)
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
    res.send(`Genre create form GEt`)
}
//Handle genre create form
exports.genre_create_post=(req,res)=>{
    res.send(`Genre create form POST`)
}
//Display genre delete form
exports.genre_delete_get=(req,res)=>{
    res.send(`Genre delete form GET`)
}
//Handle genre delete form
exports.genre_delete_post=(req,res)=>{
    res.send(`Genre delete form POST`)
}
//Display genre update form
exports.genre_update_get=(req,res)=>{
    res.send(`Genre update form GET`)
}
//Handle genre update form
exports.genre_update_post=(req,res)=>{
    res.send(`Genre update form POST`)
}
