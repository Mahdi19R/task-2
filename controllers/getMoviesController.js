
//const axios = require("axios");
const mongoose = require('mongoose')
//const dotenv = require('dotenv')
//const session = require('express-session')
const moviesSchema = require('../models/movieSchema.js')
const extensions = require('../extensions.js')
console.log(extensions);
const getAllMovies = async (req, res) => {

    try{
       // extensions.getAllDetailsFromDb(moviesSchema).then((results)=> res.send(results));
async function getAllDetailsFromDb(modelName){
            try{
                const results = await modelName.find()
                return results
            }
            catch(err){
                console.log(err.message)
            }
        }
        getAllDetailsFromDb(moviesSchema).then((results)=>res.send(results));


       
    }catch(err){
        console.log(err.message)
    }
}

module.exports =getAllMovies;