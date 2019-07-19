const { db } = require('./db/db')

const properties = [];

class Property {
  constructor(state, city, type, price, address, ownerPhoneNumber, image_url, ownerEmail) {
    this.status = 'available';
    this.state = state;
    this.city = city;
    this.owner;
    this.type = type;
    this.price = price;
    this.address = address;
    this.ownerPhoneNumber = ownerPhoneNumber;
    this.image_url = image_url;
    this.owner = ownerEmail;
  }

  async save() {
    const query = `INSERT INTO properties(status,state,city,type,price,address,ownerPhonenumber,image_url,owner) VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9) returning *`
    const values = [this.status, this.state, this.city, this.type, this.price, this.address, this.ownerPhoneNumber, this.image_url, this.owner]
    const { rows } = await db.queryWithParams(query, values)
    return rows[0]
  }

  static async getPropertyByField(field, id) {
    const query = `SELECT * FROM properties WHERE ${field} = $1`
    const values = [id]
    const { rows } = await db.queryWithParams(query, values)
    if (rows) {
      return rows[0]
    }
    return false
  }

  static async checkDuplicates(address, city, price, ownerphonenumber) {
    const query = `SELECT * FROM properties WHERE address = $1 AND city = $2 AND price = $3 AND ownerphonenumber = $4`
    const values = [address, city, price, ownerphonenumber]
    const { rows } = await db.queryWithParams(query, values)
    return rows[0]
  }

  static async getAllProperties() {
    const query = `SELECT * FROM properties`
    const { rows } = await db.basicQuery(query)
    return rows
  }

  static async deleteProperty(id) {
    const query = `DELETE FROM properties WHERE propertyid = $1`
    const values = [id]
    const { rows } = await db.queryWithParams(query, values)
  }

  static async update(field, id, value) {
    const sql = `UPDATE properties SET ${field} = $1 WHERE propertyid = $2 RETURNING *`;
    const values = [value, id]
    const { rows } = await db.queryWithParams(sql, values);
    return rows;
  }

  static async flagProperty(userEmail, propertyId, reason, description) {
    const query = `INSERT INTO flags(user_email,property_id,reason,description) VALUES($1, $2, $3, $4) returning *`
    const values = [userEmail, propertyId, reason, description]
    const { rows } = await db.queryWithParams(query, values)
    return rows[0]
  }

  static async getFlags(id) {
    const query = `SELECT * FROM flags WHERE flag_id = $1 `
    const values = [id]
    const { rows } = await db.queryWithParams(query, values)
    return rows
  }
}

module.exports = {
  properties,
  Property,
};
