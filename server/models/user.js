require('dotenv')
const uuidv4 = require('uuid/v4')
let bcrypt = require('bcryptjs')
let users = []

class User {
    constructor(firstname, lastname, email, password) {
        this.id = uuidv4()
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.admin = false
    }
    save() {
        let user = {
            userId: this.id,
            username: this.firstname + this.lastname,
            email: this.email,
            password: bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)),
            admin: this.admin
        }

        users.push(user)
    }

    static getUserByEmail(email) {
        return users.find(user => user.email === email)
    }

}

module.exports.User = User
