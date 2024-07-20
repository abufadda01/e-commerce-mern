import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import createError from "./createError.js"


const auth = async (req , res , next) => {

    let token

    try {
        
        token = req.cookies.jwt
 
        if(!token){
            return next(createError(401 , "Not Authorized , Access Denied"))
        }

        jwt.verify(token , process.env.JWT_SECRET , async (err , decodedToken) => {

            if(err){
                return next(createError(403 , "Access Forbiden"))
            }

            req.user = await User.findById(decodedToken.userId).select("-password")

            next()
        })


    } catch (error) {
        next(error)
    }
}




const admin = (req , res , next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        return next(createError(401 , "Not Authorized , admins only"))
    }
}



export {auth , admin}