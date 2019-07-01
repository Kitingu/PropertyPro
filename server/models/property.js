require('dotenv')
let bcrypt = require('bcryptjs')
let properties = []

class Property {
    constructor(state, city, type, price, address, contact, image_url, ownerEmail) {
        this.propertyId = (properties.length) + 1
        this.status = 'available'
        this.state = state
        this.city = city
        this.owner
        this.type = type
        this.price = price
        this.address = address
        this.contact = contact
        this.image_url = image_url
        this.owner = ownerEmail

    }
    save() {
        let property = {
            propertyId: this.propertyId,
            status: this.status,
            state: this.state,
            city: this.city,
            type: this.type,
            price: this.price,
            address: this.address,
            image_url: this.image_url,
            contact: this.contact,
            owner: this.owner
        }

        properties.push(property)
    }

    static getPropertybyId(id) {
        return properties.find(property => property.propertyId === id)
    }


    static getAllProperties() {
        return properties
    }
    static deleteProperty(id) {
        const property = this.getPropertybyId(id)
        const index = properties.indexOf(property)
        properties.splice(index, 1)
    }
    static changePropertyStatus(property){
        property.status = "sold"
    }
}

module.exports = {
    properties,
    Property
}
