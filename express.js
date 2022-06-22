const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const extensions = require('./extensions.js')

const manageUsersRouter = require('./routes/manageUsersRoute.js');
const getMoviesRouter = require('./routes/getMoviesRouter.js')

//dotenv.config({path: __dirname +'.env'})
// const {
//     dbPort,
//     dbHost,
//     dbName,
//     serverPort,
//   //  sessionSecret
// } = process.env

async function connectDB(){
    const uri = "mongodb://localhost:27017/MovieMania}"
    await mongoose.connect(uri)
    console.log("Connected to db!")
}
async function startServer(){
    try{
        await connectDB()
        
        const app = express()
    
        app.use(express.json())
        const store = new MongoDBStore({
            uri: 'mongodb://localhost:27017/MovieMania}',
            collection: 'mySessions'
          });
        app.use(session({
            secret: 'letMePass',
            resave: true,
            saveUninitialized: false,
          
            //store: store,
            // Boilerplate options, see:
            // * https://www.npmjs.com/package/express-session#resave
            // * https://www.npmjs.com/package/express-session#saveuninitialized
         //   resave: true,
           // saveUninitialized: true
            
        }))
       
       app.use('/user', manageUsersRouter)
       app.use('/movie',getMoviesRouter)
       app.get('/session',(req,res)=>{
        req.session.isAuth=true;
           console.log(req.session);
           res.send("Hello sessions!");
        
       })

        app.listen("3001", () => console.log("Listening to port 3001"))

    }catch(error){
       
        console.log(`Error at server connection with Db : ${error.message}`)
    }
}
startServer()

