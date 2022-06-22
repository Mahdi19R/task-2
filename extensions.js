//const { modelName } = require("./models/userSchema");

async function getAllDetailsFromDb(modelName){
    try{
        const results = await modelName.find()
        return results
    }
    catch(err){
        console.log(err.message)
    }
}


async function dbIsEmpty(SchemaName){

    try{
        const results = await SchemaName.find().count()
        return results == 0
    }
    catch(err){

        console.log(err.message)
    }

    return 1
}


//return session id == user id
function getJSessionId(){
    const jsId = document.cookie.match(/JSESSIONID=[^;]+/);
    if(jsId != null) {
        if (jsId instanceof Array)
            jsId = jsId[0].substring(11);
        else
            jsId = jsId.substring(11);
    }
    return jsId;
}


// <-------- Session -------->


function sessionHaveMovies(){
    try{
        const results = session.currentUserMovies
        return results != undefined
    }
    catch(err){
        console.log(err.message)
        return false
    }
}

function sessionHaveLikedMovies(){
    try{
        const results = session.currentUserLikedMovies
        return results != undefined
    }
    catch(err){
        console.log(err.message)
        return false
    }
}



module.exports ={dbIsEmpty,getAllDetailsFromDb,sessionHaveMovies,sessionHaveLikedMovies};