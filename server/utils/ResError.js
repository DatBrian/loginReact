const resError = (res, status, message) => {
    res.status(status).json({
        error: true,
        message
    })
}
export default resError