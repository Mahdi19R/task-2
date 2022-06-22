const mongoose = require('mongoose');
const user = require('../models/userSchema.js')
const moviesSchema = require('../models/movieSchema.js')
const extensions = require('../extensions.js')
const session = require('express-session')
console.log(extensions)

// GET request for a list of all users
const getUsers = async (req, res) => {
    try {

        // const users = await user.find();
        // if (users) {
        //     res.status(200).json(users);
        // }


        // extensions.getAllDetailsFromDb(user).then((results) =>res.send(results) );

        // async function getAllDetailsFromDb(modelName){
        //     try{
        //         const results = await modelName.find()
        //         return results
        //     }
        //     catch(err){
        //         console.log(err.message)
        //     }
        // }
        //  getAllDetailsFromDb(user).then((results)=>res.send(results));
        //req.session.isAuth=true;
        //   console.log(session.currentUserMovies);
        //   res.send("Hello sessions!");

    } catch (error) {
        res.status(500).json({ message: "internal error" });
    }
}

// GET request for one user (specified by its ID)
const getUser = async (req, res) => {

    try {
        const id = req.params.id;
        const filters = {
            _id: id
        }

        const fetchedUser = await user.find(filters);

        if (fetchedUser) {
            res.status(200).json(fetchedUser);
        }
    } catch (error) {
        res.status(500).json({ message: "internal error" });
    }

}

// POST request to add a user
const addUser = async (req, res) => {
    try {
        const addedUser = req.body;
        const result = await user.create(addedUser);

        if (result) {
            res.status(201).json({ message: "added user" });
        } else {
            res.status(409).json({ message: "failed to add user" });
        }
    } catch (error) {
        res.status(500).json({ message: `internal error : ${error.message}` });
    }

}



// PUT request to update a user
const updateUser = async (req, res) => {

    try {
        const updatedUser = req.body;
        const id = req.params.id;
        const result = await user.updateOne(updatedUser);

        if (result) {
            res.status(201).json({ message: "updated user" });
        } else {
            res.status(409).json({ message: "failed to update user" });
        }
    } catch (error) {
        res.status(500).json({ message: "internal error" });
    }


}

// DELETE request to delete a user
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await user.deleteOne({ _id: id })
        user.sub = req.body.user
        if (result['deletedCount']) {
            res.status(200).json({ message: "deleted user" });
        } else {
            res.status(404).json({ message: "user does not exist" });

        }


    } catch (error) {
        res.status(500).json({ message: "internal error" });
    }

}

const getAllMoviesFromDB = async (req, res) => {

    try {

        if (!extensions.sessionHaveMovies()) {
            console.log("session don't have the movies")
            extensions.getAllDetailsFromDb(moviesSchema).then((results) => {
                session.currentUserMovies = results
                res.send(session.currentUserMovies)
                // console.log("Successssss")
                //   console.log(session.currentUserLikedMovies)
            })

        } else {
            console.log("session have the movies")
            res.send(session.currentUserMovies)
        }

    } catch (err) {
        console.log(err.message)
    }
}
const getUserLikedMoviesFromDB = async (req, res) => {

    try {

        let moviesId = []
        let likedMoviesArray = []
        let unlikedMoviesArray = []
        let moviesCount = await moviesSchema.count()
        let k = 0
        const userId = req.params.userId;

        if (!extensions.sessionHaveLikedMovies()) {

            console.log("session don't have the user liked movies")
            const liked = await user.find({ _id: userId })
            const movies = await moviesSchema.find()

            for (let i = 0; i < moviesCount; i++) {

                moviesId[i] = movies[i]._id

            }

            likedMoviesArray = liked[0].likedMovies

            for (let i = 0; i < moviesCount; i++) {

                for (let j = 0; j < likedMoviesArray.length; j++) {

                    if (likedMoviesArray[j] != moviesId[i]) {

                        unlikedMoviesArray[k] = moviesId[i]
                        k++

                    }
                }
            }

            session.currentUserLikedMovies = likedMoviesArray
            session.currentUserUnLikedMovies = unlikedMoviesArray
            res.send(likedMoviesArray)

        } else {

            console.log("session have the user liked movies")
            res.send(session.currentUserLikedMovies)

        }

    } catch (err) {

        console.log(err.message)

    }
}



const addLikedMovie = async (req, res) => {
    try {

        const userId = req.params.userId;
        const movieId = req.params.movieId;
        const currentUser = await user.findById(userId);
        session.currentUserInfo = currentUser;
        const likeAddedToDb = await user.updateOne({ _id: userId }, { $push: { likedMovies: movieId } });
        const likeAddedToSession = await session.currentUserInfo.likedMovies.push(movieId)

        console.log(session.currentUserInfo.likedMovies)

    } catch (error) {
        res.status(500).json({ message: "internal error" });
    }
}


const removeLikedMovie = async (req, res) => {
    try {

        const userId = req.params.userId;
        const movieId = req.params.movieId;
        const likeRemovedFromDb = await user.updateOne({ _id: userId }, { $pull: { likedMovies: movieId } });
        const likeRemovedFromSession = await session.currentUserInfo.likedMovies.pull(movieId)

        console.log(session.currentUserInfo.likedMovies)

    } catch (error) {
        res.status(500).json({ message: "internal error" });
    }
}



// const getLikedMovies= async (req, res) => {
//     try{
//         let userId
//         extensions.getJSessionId().then( async (jsId) => {
//             userId = jsId
//         })

//         if(!extensions.sessionHaveLikedMovies(userId)){
//             console.log("session don't have liked movies")
//             extensions.getlikedMoviesFromDb(extensions.getJSessionId()).then( (results) => {
//             session.currentUserMovies = results
//             res.send(results)

//            })
//         }else{
//             console.log("session have liked movies")
//             res.send(session.currentUserMovies)

//         }
// }catch(err){
//     console.log(err.message)
// }
// }


module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    addLikedMovie,
    removeLikedMovie,
    getAllMoviesFromDB,
    getUserLikedMoviesFromDB
}