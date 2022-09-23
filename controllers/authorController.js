const Author = require("../models/author")

//Display the list of all authors
exports.author_list = (req,res,next)=>{
    //Find all authors and sort them in ascending order based on their first name
    Author.find().sort([['first_name','ascending']]).exec(function(err,list_of_authors){
        //If an error occurs pass the error to express
        if(err)
        {
            next(err)
        }
        res.render('authorList', {
            title:'Author List',
            author_list:list_of_authors
        })
    })
}
//Display the details of an author
exports.author_detail=(req,res)=>{
    res.send(`Details of author with the ID of ${req.params.id}`)
}
//Display author create form
exports.author_create_get=(req,res)=>{
    res.send(`Author create form GET`)
}
//Handle author create form
exports.author_create_post=(req,res)=>{
    res.send(`Author create form POST`)
}
//Display author delete form
exports.author_delete_get=(req,res)=>{
    res.send(`Author delete form GET`)
}
//Handle author delete form
exports.author_delete_post=(req,res)=>{
    res.send(`Author delete form POST`)
}
//Display author update form
exports.author_update_get=(req,res)=>{
    res.send(`Author update form GET`)
}
//Handle author update form
exports.author_update_post=(req,res)=>{
    res.send(`Author update form POST`)
}
