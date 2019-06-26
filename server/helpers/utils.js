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

module.exports = {
    hashPassword,
    compareHash
}
