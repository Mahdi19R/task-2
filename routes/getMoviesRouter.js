// const {
//     getAllMovies,
//     getMoviesByGenre
//  } = require('../controllers/getMoviesController.js')
const getAllMovies=require('../controllers/getMoviesController.js')

const Router = require('express').Router

const moviesRouter = Router()

moviesRouter.get('/', getAllMovies)

// moviesRouter.post('/', getMoviesByGenre)

 module.exports = moviesRouter;