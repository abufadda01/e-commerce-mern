import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import connectDB from "./db/connect.js"

import errorHandler from "./middlewares/errorHandler.js"
import notFound from "./middlewares/notFound.js"

dotenv.config() 


const app = express() 


app.use(express.json())
app.use(cors())

// allow to us to parse our cookie from the req
app.use(cookieParser())


import productRoutes from "./routes/productRoutes.js"
app.use("/api/products" , productRoutes)

import userRoutes from "./routes/userRoutes.js"
app.use("/api/users" , userRoutes)

import ordersRoutes from "./routes/orderRoutes.js"
app.use("/api/orders" , ordersRoutes)


app.get("/api/config/paypal" , (req , res) => {
    res.send({clientId : process.env.PAYPAL_CLIENT_ID})
})



// middlewares , custom middlewares
app.use(notFound)
app.use(errorHandler)


 
const PORT = process.env.PORT || 5000
 
const start = async () => {
    try {
        app.listen(PORT , () => console.log(`proshop server started on port ${PORT}`))
        await connectDB()
    } catch (error) {
        console.log(error)        
    }
}
 
start()