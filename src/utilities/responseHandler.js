const responseHandler = (res, statusCode, returnValue) =>{
    return res.status(statusCode).json(returnValue)
} 
export default responseHandler