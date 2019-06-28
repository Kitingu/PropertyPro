require('dotenv')
const uuidv4 = require('uuid/v4')
let bcrypt = require('bcryptjs')
let properties = []

class Property {
    constructor(status, state, city, type,price, address, contact, image_url, ownerEmail) {
        this.id = uuidv4()
        this.status = status
        this.state = state
        this.city = city
        this.owner
        this.type=type
        this.price = price
        this.address = address
        this.contact = contact
        this.image_url = image_url
        this.owner = ownerEmail

    }
    save() {
        let property = {
            propertyId: this.id,
            status: this.status,
            state: this.state,
            city: this.city,
            type: this.type,
            price: this.price,
            address: this.address,
            image_url: this.image_url,
            contact:this.contact,
            owner: this.owner
        }

        properties.push(property)
    }

    static getPropertybyId(id) {
        return properties.find(user => property.id === id)
    }

}

module.exports = {
    properties,
    Property
}
