const User = require('../models/userModel');

/**
 * for getting the list of all users
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllUsers = async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        status:true,
        users
    })
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.createUser = async(req,res,next)=>{
    const user = await User.create(req.body);
    const token = user.getJwtToken();
    res.status(201).json({
        success:true,
        user,
        token
    })
}