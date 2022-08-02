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

    sendToken(user,201,res);
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

    sendToken(user,200,res);

}


//Creating token and saving in cookie
const sendToken = (user,statusCode,res)=> {
    const token = user.getJwtToken();

    //options for cookie
    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
        httpOnly:true
    }
    
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token
    })

}

exports.logout = async (req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:'Logged out Successfully.'
    })
}