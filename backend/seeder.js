import mongoose from "mongoose";
import dotenv from "dotenv"
import colors from "colors"

import users from "./data/users.js"
import products from "./data/products.js";

import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"

import connectDB from "./db/connect.js";


dotenv.config()
connectDB()


const importData = async () => {
    
    try {
        
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        // get the admin user form the users array to insert it inside the user key inside the products schema
        const adminUser = createdUsers[0]._id

        // spread over all products array of objects and keep each object as it was and just update the user key inside each object
        const createdProducts = products.map((product) => {
            return {...product , user : adminUser}
        })

        await Product.insertMany(createdProducts)

        console.log("Data inserted from the seeder file".green.inverse)

        process.exit()

    } catch (error) {
        console.log("Error to insert data".red.inverse)
        process.exit(1)        
    }
}



const destroyData = async () => {
    try {
        
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log("data destroyed".red.inverse)

        process.exit()

    } catch (error) {
        console.log("Error to insert data".red.inverse)
        process.exit(1)      
    }
}


if(process.argv[2] === "-d"){
    destroyData()
}else{
    importData()
}