const {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    addLikedMovie,
    removeLikedMovie,
    getAllMoviesFromDB,
    getUserLikedMoviesFromDB
} = require('../controllers/manageUsersController.js')

const Router = require('express').Router;
 
// initialize express router
const usersRouter = Router();

// GET request for a list of all users 
usersRouter.get('/', getUsers);

// GET request for one user (specified by its ID)
usersRouter.get('/:id', getUser);

// POST request to add a user
usersRouter.post('/add', addUser);

// PUT request to update a user
usersRouter.put('/:id/update', updateUser);

// DELETE request to delete a user
usersRouter.delete('/:id/delete', deleteUser);

//PUT request to add liked movie
usersRouter.put('/:userId/:movieId/addLike',addLikedMovie);

//PUT request to remove liket movie
usersRouter.put('/:userId/:movieId/removeLike',removeLikedMovie)


usersRouter.get('/session/movies',getAllMoviesFromDB)


usersRouter.get('/:userId/likedMovies',getUserLikedMoviesFromDB)
module.exports = usersRouter;

