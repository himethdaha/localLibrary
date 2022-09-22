const express = require('express')
const router = express.Router()

const authorController = require('../controllers/authorController')
const bookController = require('../controllers/bookController')
const bookInstanceController = require('../controllers/bookInstanceController')
const genreController = require('../controllers/genreController')

//ROUTES FOR AUTHORS
//create author form GET
router.get('/author/create',authorController.author_create_get)
//create author form POST
router.post('/author/create',authorController.author_create_post)
//GET all authors
router.get('/authors',authorController.author_list)
//GET author details
router.get('/author/:id',authorController.author_detail)
//DELETE author form GET
router.get('/author/:id/delete',authorController.author_delete_get)
//DELETE author form POST
router.post('/author/:id/delete',authorController.author_delete_post)
//UPDATE author form GET
router.get('/author/:id/update',authorController.author_update_get)
//UPDATE author form POST
router.post('/author/:id/update',authorController.author_update_post)


//ROUTES FOR BOOKS
//GET Index page 
router.get('/',bookController.index)
//create book form GET
router.get('/book/create',bookController.book_create_get)
//create book form POST
router.post('/book/create',bookController.book_create_post)
//GET all books
router.get('/books',bookController.book_list)
//GET BOOK details
router.get('/book/:id',bookController.book_detail)
//DELETE book form GET
router.get('/book/:id/delete',bookController.book_delete_get)
//DELETE book form POST
router.post('/book/:id/delete',bookController.book_delete_post)
//UPDATE book form GET
router.get('/book/:id/update',bookController.book_update_get)
//UPDATE book form POST
router.post('/book/:id/update',bookController.book_update_post)

//ROUTES FOR BOOKINSTANCES
//create bookInstance form GET
router.get('/bookInstance/create',bookInstanceController.bookInstance_create_get)
//create bookInstance form POST
router.post('/bookInstance/create',bookInstanceController.bookInstance_create_post)
//GET all bookInstances
router.get('/bookInstances',bookInstanceController.bookInstance_list)
//GET bookInstance details
router.get('/bookInstance/:id',bookInstanceController.bookInstance_detail)
//DELETE bookInstance form GET
router.get('/bookInstance/:id/delete',bookInstanceController.bookInstance_delete_get)
//DELETE bookInstance form POST
router.post('/bookInstance/:id/delete',bookInstanceController.bookInstance_delete_post)
//UPDATE bookInstance form GET
router.get('/bookInstance/:id/update',bookInstanceController.bookInstance_update_get)
//UPDATE bookInstance form POST
router.post('/bookInstance/:id/update',bookInstanceController.bookInstance_update_post)


//ROUTES FOR GENRES
//create book form GET
router.get('/genre/create',genreController.genre_create_get)
//create genre form POST
router.post('/genre/create',genreController.genre_create_post)
//GET all genres
router.get('/genres',genreController.genre_list)
//GET genre details
router.get('/genre/:id',genreController.genre_detail)
//DELETE genre form GET
router.get('/genre/:id/delete',genreController.genre_delete_get)
//DELETE genre form POST
router.post('/genre/:id/delete',genreController.genre_delete_post)
//UPDATE genre form GET
router.get('/genre/:id/update',genreController.genre_update_get)
//UPDATE genre form POST
router.post('/genre/:id/update',genreController.genre_update_post)


module.exports = router