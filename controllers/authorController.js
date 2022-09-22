const Author = require('../models/author')

//Display the list of all authors
exports.author_list(req,res=>{
    res.send(`List of all authors`)
})
//Display the details of an author
exports.author_detail(req,res=>{
    res.send(`Details of author with the ID of ${req.params.id}`)
})
//Display author create form
exports.author_create_get(req,res=>{
    res.send(`Author create form GEt`)
})
//Handle author create form
exports.author_create_post(req,res=>{
    res.send(`Author create form POST`)
})
//Display author delete form
exports.author_delete_get(req,res=>{
    res.send(`Author delete form GET`)
})
//Handle author delete form
exports.author_delete_post(req,res=>{
    res.send(`Author delete form POST`)
})
//Display author update form
exports.author_update_get(req,res=>{
    res.send(`Author update form GET`)
})
//Handle author update form
exports.author_update_post(req,res=>{
    res.send(`Author update form POST`)
})
