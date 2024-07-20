import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    rating : {
        type : Number ,
        required : true ,
    },
    comment : {
        type : String ,
        required : true
    },
} , {timestamps : true})




const productSchema = new mongoose.Schema({
    // will be ref to the admin user that add this product
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "users"
    },
    name : {
        type : String ,
        required : true
    },
    image : {
        type : String ,
        required : true
    },
    brand : {
        type : String ,
        required : true
    },
    category : {
        type : String ,
        required : true
    },
    description : {
        type : String ,
        required : true
    },
    // will be an array of reviewSchema obj documents 
    reviews : [reviewSchema],
    rating : {
        type : Number ,
        required : true ,
        default : 0
    },
    numReviews : {
        type : Number ,
        required : true ,
        default : 0
    },
    price : {
        type : Number ,
        required : true ,
        default : 0
    },
    countInStock : {
        type : Number ,
        required : true ,
        default : 0
    },
} , {timestamps : true})



const Product = mongoose.model("products" , productSchema)


export default Product