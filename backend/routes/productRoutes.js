import express from "express"

import {getAllProducts , getSpecificProduct} from "../controllers/productControllers.js"


const router = express.Router()


router.get("/" , getAllProducts)

router.get("/:id" , getSpecificProduct)



export default router