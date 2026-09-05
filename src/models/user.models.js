import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    avatar : {
        type : {
            url : String,
            localpath : String
        },
        default : {
            url : String,
            localpath : "https://placehold.co/400",
        }
    },
    username : {
        type : String,
        unique : true,
        required : true,
    },
    fullname : {
        type : String,
        required : false
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    isEmailVerified : {
        type : Boolean,
        default : false
    },
    refreshToken : {
        type : String
    },
    forgotPasswordToken : {
        type : String
    },
    forgetPasswordExpiry : {
        type : Date
    },
    emailVerificationToken : {
        type : String
    },
    emailVerificationExpiry : {
        type : Date,
    }

}, { timestamps : true })


const User = mongoose.model("User" , userSchema)

userSchema.pre("save" , async function( next ){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 10)
    }
    next()
})

userSchema.methods.isCorrectPassword = async function( password ){
    return await bcrypt.compare( password , this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        { 
            id : this._id,
            email : this.email
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn : process.env.JWT_ACCESS_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateTemporaryToken = function(){
    const unhashedToken = crypto.randomBytes(32).toString('hex')

    const hashedToken = crypto
                            .createHash('sha256')
                            .update(unhashedToken)
                            .digest('hex')

    const tokenExpiry = Date.now() + ( 20 * 60 * 1000 ) // 20Min


    return { unhashedToken , hashedToken , tokenExpiry }
}

export default User