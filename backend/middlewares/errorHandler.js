
const errorHandler = (err , req , res , next) => {

    let errorObj = {
        statusCode : err.status || 500 ,
        message : err.message || "Somthing went wrong"
    }

    if(err.name === "CastError" && err.kind === "ObjectId"){
        errorObj.statusCode  = 404
        errorObj.message = `Resource not found`
    }


    res.status(errorObj.statusCode).json({
        message : errorObj.message ,
        stack : process.env.NODE_ENV === "production" ? "👌": err.stack
    })

}


export default errorHandler