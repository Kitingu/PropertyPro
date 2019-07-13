require('dotenv');
const uuidv4 = require('uuid/v4');

const users = [];

class User {
  constructor(firstname, lastname, email, password, isAgent) {
    this.id = uuidv4();
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.isAgent = isAgent;
    this.isAdmin = false;
  }

  save() {
    const user = {
      userId: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.firstname + this.lastname,
      email: this.email,
      password: this.password,
      isAgent: this.isAgent,
      isAdmin: this.isAdmin,
    };

    users.push(user);
  }

  static getUserByEmail(email) {
    return users.find(user => user.email === email);
  }
}

module.exports = {
  users,
  User,
};
