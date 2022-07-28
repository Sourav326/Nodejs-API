const User = require('../models/userModel');

exports.getAllUsers = async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        status:true,
        users
    })
}

exports.createUser = async(req,res,next)=>{
    const user = await User.create(req.body);
    const token = user.getJwtToken();
    res.status(201).json({
        success:true,
        user,
        token
    })
}