import express from "express"


import { auth , admin } from "../middlewares/auth.js"

import {
    addOrderItems , 
    getUserOrders , 
    getOrderById , 
    updateOrderToPaid , 
    updateOrderToDelivered , 
    getAllOrders
} from "../controllers/orderControllers.js"

const router = express.Router()



router.post("/" , auth , addOrderItems)

router.get("/" , auth , admin , getAllOrders)

router.get("/myOrders" , auth , getUserOrders)

router.get("/:orderId" , auth , getOrderById)   

router.put("/:orderId/pay" , auth , updateOrderToPaid)

router.put("/:orderId/deliver" , auth , admin , updateOrderToDelivered)



export default router