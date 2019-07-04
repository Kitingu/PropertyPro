const { Response } = require('../helpers/utils')
const userResponse = new Response()
const handlers = {
    async handle404(req, res, next) {
        const error = new Error('Resource not found')
        error.status = 404
        next(error)
    },
    async handle500(error, req, res, next) {
        res.status(error.status || 500)
        userResponse.setError(error.status || 500, 'failed', error.message)
        return userResponse.send(res)

    }

}
module.exports = handlers
