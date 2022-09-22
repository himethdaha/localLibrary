const Book = require('../models/book')

//Will be the sites Index page
exports.index(req,res=>{
    res.send(`Index Page`)
})
//Display the list of all books
exports.book_list(req,res=>{
    res.send(`List of all books`)
})
//Display the details of an book
exports.book_detail(req,res=>{
    res.send(`Details of book with the ID of ${req.params.id}`)
})
//Display book create form
exports.book_create_get(req,res=>{
    res.send(`book create form GEt`)
})
//Handle book create form
exports.book_create_post(req,res=>{
    res.send(`book create form POST`)
})
//Display book delete form
exports.book_delete_get(req,res=>{
    res.send(`book delete form GET`)
})
//Handle book delete form
exports.book_delete_post(req,res=>{
    res.send(`book delete form POST`)
})
//Display book update form
exports.book_update_get(req,res=>{
    res.send(`book update form GET`)
})
//Handle book update form
exports.book_update_post(req,res=>{
    res.send(`book update form POST`)
})
