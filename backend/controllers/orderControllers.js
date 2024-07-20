import Order from "../models/orderModel.js"
import createError from "../middlewares/createError.js"
import Joi from "joi"



const addOrderItems = async (req , res , next) => {

    try {
        
        const {orderItems , shippingAddress , paymentMethod , itemsPrice , taxPrice , shippingPrice , totalPrice} = req.body

        if(!orderItems || orderItems.length === 0){
            return next(createError(400 , "No Order Items"))
        }

        const order = new Order({
            orderItems : orderItems.map((x) => ({
                ...x,
                product : x._id ,
                _id : undefined
            })) ,
            user : req.user._id ,
            shippingAddress ,
            paymentMethod ,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        await order.save()

        res.status(201).json(order)

    } catch (error) {
        next(error)
    }
}




const getUserOrders = async (req , res , next) => {

    try {
        const orders = await Order.find({user : req.user._id})
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}




const getOrderById = async (req , res , next) => {

    try {
        const order = await Order.findById(req.params.orderId).populate("user" , "name email")

        if(!order){
            return next(createError(404 , "Order not found"))
        }

        res.status(200).json(order)

    } catch (error) {
        next(error)
    }
}




const updateOrderToPaid = async (req , res , next) => {

    try {
        
        const order = await Order.findById(req.params.orderId)

        if(!order){
            return next(createError(404 , "Order not found"))
        }

        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id : req.body.id,
            status : req.body.status ,
            update_time : req.body.update_time ,
            email_address : req.body.email_address ,
        }

        const updatedOrder = await order.save()

        res.status(200).json(updatedOrder)

    } catch (error) {
        next(error)
    }
}




const updateOrderToDelivered = async (req , res , next) => {

    try {
        
    } catch (error) {
        
    }
}





const getAllOrders = async (req , res , next) => {

    try {
        
    } catch (error) {
        
    }
}





export {addOrderItems , getUserOrders , getOrderById , updateOrderToPaid , updateOrderToDelivered , getAllOrders}