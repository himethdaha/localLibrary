const BookInstance = require('../models/bookInstance')

//Display the list of all book instances
exports.bookInstance_list=(req,res)=>{
    res.send(`List of all book instances`)
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
