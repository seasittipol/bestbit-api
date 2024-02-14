const createError = (message, statusCode) => {
    const error = new Error(message)
    error.status = statusCode
    throw error
}

module.exports = createError