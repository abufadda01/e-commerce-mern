import User from "../models/userModel.js"
import createError from "../middlewares/createError.js"
import Joi from "joi"



const register = async (req , res , next) => {

    const loginSchema = Joi.object({
        name : Joi.string().min(3).required(),
        email : Joi.string().email().required(),
        password : Joi.string().required()
    })

    const {value , error} = loginSchema.validate(req.body , {
        abortEarly : false
    })

    if(error){
        return next(createError(400 , "Invalid Credentials"))
    }

    try {
        
        const {name , email , password} = req.body

        if(!name || !email || !password){
            return next(createError(400 , "Invalid Credentials"))            
        }

        let user = await User.findOne({email})

        if(user) {
            return next(createError(400 , "User already exist"))
        }

        user = new User({
            name ,
            email,
            password
        })

        await user.save()

        const token = user.signJWT()

        res.cookie("jwt" , token , {
            httpOnly : true,
            secure : process.env.NODE_ENV !== "development" ,
            sameSite : "strict" ,
            maxAge : 30 * 24 * 60 * 60 * 1000
        })  

        user.password = undefined

        res.status(201).json(user)


    } catch (error) {
        next(error)
    }
} 




const login = async (req , res , next) => {

    const loginSchema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().required()
    })

    const {value , error} = loginSchema.validate(req.body , {
        abortEarly : false
    })

    if(error){
        return next(createError(400 , "Invalid Credentials"))
    }


    try {
        
        const {email , password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            return next(createError(400 , "Invalid Credentials"))
        }

        const isPasswordMatched = await user.matchPassword(password)

        if(!isPasswordMatched){
            return next(createError(400 , "Invalid Credentials"))            
        }

        const token = user.signJWT()

        res.cookie("jwt" , token , {
            httpOnly : true,
            secure : process.env.NODE_ENV !== "development" ,
            sameSite : "strict" ,
            maxAge : 30 * 24 * 60 * 60 * 1000
        })  

        user.password = undefined

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
} 




const logOut = async (req , res , next) => {

    try {
        
        res.cookie("jwt" , "" , {
            httpOnly : true ,
            expires : new Date(0)
        })

        res.status(200).json({msg : "Logged out successfully"})

    } catch (error) {
        next(error)
    }
} 




const getUserProfile = async (req , res , next) => {
    
    try {

        const user = await User.findById(req.user._id)

        if(!user) {
            return next(createError(400 , "Invalid Credentials"))
        }

        user.password = undefined

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
} 





const updateUserProfile = async (req , res , next) => {

    try {
        
        const user = await User.findById(req.user._id)

        if(!user) {
            return next(createError(400 , "Invalid Credentials"))
        }

        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email

            if(req.body.password){
                user.password = req.body.password
            }

            await user.save()

            user.password = undefined

            res.status(200).json(user)

        }

    } catch (error) {
        next(error)
    }
} 




const getUsers = async (req , res , next) => {
    
    try {
        
    } catch (error) {
        
    }
} 




const getUserById = async (req , res , next) => {
    try {
        
    } catch (error) {
        
    }
} 




const deleteUser = async (req , res , next) => {
    try {
        
    } catch (error) {
        
    }
} 




const updateUser = async (req , res , next) => {
    try {
        
    } catch (error) {
        
    }
}




export {
    register , 
    login , 
    logOut , 
    getUserProfile , 
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}