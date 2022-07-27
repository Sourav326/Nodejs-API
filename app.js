const express = require('express');//import the express(Third party module)
const app = express();

app.use(express.json());

//Route imports
const products = require('./routes/productRoute');
app.use(products);


module.exports = app;//export the app module