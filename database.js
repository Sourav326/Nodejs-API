const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_HOSTNAME).then(()=>{
        console.log('Database connected Successfully');
    }).catch((err)=> {
        console.log(err);
    })
}

module.exports = connectDatabase;
