const app = require('./app');//import the app module (File based module)

const dotenv = require('dotenv');//import the dotenv(Third party module)
dotenv.config({path:'config.env'});//give the path of the env file

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on ${process.env.PORT}`);
})