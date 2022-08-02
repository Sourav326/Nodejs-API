const express = require('express');//import the express(Third party module)
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//Route imports
const products = require('./routes/productRoute');
const users = require('./routes/userRoute');
app.use(products);
app.use(users);


module.exports = app;//export the app module