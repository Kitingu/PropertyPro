require('dotenv');
const { db } = require('./db/db')
const users = []

class User {
  constructor(firstname, lastname, email, password, isAgent = false) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.isAgent = isAgent;
    this.isAdmin = false;
  }

  async save() {
    const query = `INSERT INTO users(firstname,lastname,email,password,isAgent,isAdmin) VALUES($1, $2, $3, $4, $5, $6) returning *`
    const values = [this.firstname, this.lastname, this.email, this.password, this.isAgent, this.isAdmin]
    const { rows } = await db.queryWithParams(query, values)
    return rows[0]
  }

  static async getUserByEmail(email) {
    const query = `SELECT * from users where email = $1`
    const values = [email]

    const { rows } = await db.queryWithParams(query, values)
    if (rows) {
      return rows[0]
    }
    return false
  }
}

module.exports = {
  users,
  User,
};
