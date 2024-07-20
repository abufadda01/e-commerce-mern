import createError from "../middlewares/createError.js"
import Product from "../models/productModel.js"


const getAllProducts = async (req , res , next) => {
    const products = await Product.find({})
    res.json(products)
}



const getSpecificProduct = async (req , res , next) => {
   
    const product = await Product.findById(req.params.id)
    
    if(!product){
        return next(createError(404 , "product not found"))
    }

    res.status(200).json(product) 

}


export {getAllProducts , getSpecificProduct}