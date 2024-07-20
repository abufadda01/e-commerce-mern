import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true ,
    },
    isAdmin : {
        type : Boolean ,
        required : true ,
        default : false
    }
} , {timestamps : true})




userSchema.pre("save" , async function(next){

    if(!this.isModified("password")){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password , salt)
    this.password = hashedPassword

})



userSchema.methods.signJWT = function(){
    return jwt.sign({userId : this._id} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRE})
}


userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}



const User = mongoose.model("users" , userSchema)


export default User