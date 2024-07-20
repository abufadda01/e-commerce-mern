
const createError = (statusCode , msg) => {
    let error = new Error()
    error.message = msg
    error.status = statusCode
    return error
}


export default createError