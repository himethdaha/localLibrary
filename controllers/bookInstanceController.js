const BookInstance = require('../models/bookInstance')

//Display the list of all book instances
exports.bookinstance_list(req,res=>{
    res.send(`List of all book instances`)
})
//Display the details of a bookinstance
exports.bookinstance_detail(req,res=>{
    res.send(`Details of bookinstance with the ID of ${req.params.id}`)
})
//Display bookinstance create form
exports.bookinstance_create_get(req,res=>{
    res.send(`bookinstance create form GEt`)
})
//Handle bookinstance create form
exports.bookinstance_create_post(req,res=>{
    res.send(`bookinstance create form POST`)
})
//Display bookinstance delete form
exports.bookinstance_delete_get(req,res=>{
    res.send(`bookinstance delete form GET`)
})
//Handle bookinstance delete form
exports.bookinstance_delete_post(req,res=>{
    res.send(`bookinstance delete form POST`)
})
//Display bookinstance update form
exports.bookinstance_update_get(req,res=>{
    res.send(`bookinstance update form GET`)
})
//Handle bookinstance update form
exports.bookinstance_update_post(req,res=>{
    res.send(`bookinstance update form POST`)
})
