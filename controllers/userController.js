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
 * for registering the user
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.registerUser = async(req,res,next)=>{
    const user = await User.create(req.body);
    const token = user.getJwtToken();
    res.status(201).json({
        success:true,
        user,
        token
    })
}

exports.login = async(req,res,next)=>{
    const  {email,password} = req.body;

    //checking if user has given password and email both
    if(!email || !password){
        return res.status(400).json({//400 not found
            status:false,
            message:"Please enter email and password"
        })
    }

    //checking if email and password is correct
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({//401 unauthorize
            status:false,
            message:"Invalid email and password"
        })
    }

    //checking if password is correct
    const isPasswordMatched = await user.comparePassword(password);//comparePassword method in user model
    if(!isPasswordMatched){
        return res.status(401).json({//401 unauthorize
            status:false,
            message:"Invalid email and password"
        })
    }

    const token = user.getJwtToken();
    res.status(200).json({
        success:true,
        user,
        token
    })

}