const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({
            status:false,
            message:"Please login to access this resource."
        })
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();

}