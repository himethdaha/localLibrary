const Genre = require('../models/genre')

//Display the list of all genres
exports.genre_list(req,res=>{
    res.send(`List of all genres`)
})
//Display the details of a genre
exports.genre_detail(req,res=>{
    res.send(`Details of genre with the ID of ${req.params.id}`)
})
//Display genre create form
exports.genre_create_get(req,res=>{
    res.send(`Genre create form GEt`)
})
//Handle genre create form
exports.genre_create_post(req,res=>{
    res.send(`Genre create form POST`)
})
//Display genre delete form
exports.genre_delete_get(req,res=>{
    res.send(`Genre delete form GET`)
})
//Handle genre delete form
exports.genre_delete_post(req,res=>{
    res.send(`Genre delete form POST`)
})
//Display genre update form
exports.genre_update_get(req,res=>{
    res.send(`Genre update form GET`)
})
//Handle genre update form
exports.genre_update_post(req,res=>{
    res.send(`Genre update form POST`)
})
