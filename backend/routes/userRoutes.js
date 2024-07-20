import express from "express"

import {
    register , 
    login , 
    logOut , 
    getUserProfile , 
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from "../controllers/userControllers.js"

import { auth , admin } from "../middlewares/auth.js"

const router = express.Router()


router.post("/register" , register)

router.post("/login" , login) 

router.post("/logout" , logOut)

router.get("/" , auth , admin , getUsers)

router.get("/profile" , auth , getUserProfile)

router.put("/profile" , auth , updateUserProfile)

router.get("/:id" , auth , admin , getUserById)
router.put("/:id" , auth , admin , updateUser)
router.delete("/:id" , auth , admin , deleteUser)



export default router