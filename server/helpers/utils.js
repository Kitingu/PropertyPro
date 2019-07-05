const bcrypt = require('bcryptjs')


const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8))

const compareHash = (password, hashedPassword) => {
    if (bcrypt.compareSync(password, hashedPassword)) {
        return true
    }
    else {
        return false
    }
}

class Response {
    constructor() {
        this.statusCode = null;
        this.status = null
        this.type = null;
        this.data = null;
        this.message = null;
    }

    setSuccess(statusCode, status, message, data) {
        this.statusCode = statusCode;
        this.status = status
        this.message = message;
        this.data = data;
        this.type = 'success';
    }

    setError(statusCode, status, message) {
        this.statusCode = statusCode;
        this.status = status
        this.message = message;
        this.type = 'error';
    }

    send(res) {
        const result = {
            status: this.status,
            message: this.message,
            data: this.data
        };

        if (this.type === 'success') {
            return res.status(this.statusCode).json(result);
        }
        return res.status(this.statusCode).json({
            status: this.status,
            message: this.message
        });
    }
}


const checkOwner = (req, property) => {
    const user = req.user.email
    const owner = property.owner
    return user === owner
}

module.exports = {
    hashPassword,
    compareHash,
    checkOwner,
    Response
}
