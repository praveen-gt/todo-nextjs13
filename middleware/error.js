export const errorhandler = (res, statusCode=500, message="Internal Server Error") => {
    return res.status(statusCode).json({
        success: false,
        message: message
    })
}

export const asyncError = (passesFunc) => (req, res) => {
    return Promise.resolve(passesFunc(req, res)).catch((e)=>{
        return errorhandler(res, 500, e.message)
    })
}