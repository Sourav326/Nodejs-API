const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[3,"name cannot less than 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validator:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter the password"],
        maxLength:[5,"Password must be greater than 5 charactors"],
        select:false//it didn't give the password when we fetch the user details
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});


//to bcypt the password
userSchema.pre("save",async function(next){
    //condition if password is not modified, which is happend during update than dont hash the password otherwise it will hash the password second time
    if(!this.isModified("password")){
        next();
    }
    //this will run during registration and during password change as password is modified in these conditions
    this.password = await bcrypt.hash(this.password,12);
});



//JWT Token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

module.exports = mongoose.model("users",userSchema);