const utils = {
  user: {
    firstname: 'benedict',
    lastname: 'gathee',
    email: 'asdf@gmail.com',
    password: 'asdQ@123',
    isAgent: true,
  },
  user1: {
    firstname: 'nelson',
    lastname: 'mandela',
    email: 'nelson@gmail.com',
    password: 'asdQ@123',
    isAgent: true,
  },
  userLogin1: {
    email: 'asdf@gmail.com',
    password: 'asdQ@123',
  },
  invalid_login: {
    email: 'asdmail.com',
    password: 'asdQ@123',
  },
  sample_property: {
    propertyId: 2,
    status: 'goog',
    state: 'kenya',
    city: 'nairobi',
    type: 'two',
    price: '40000',
    address: '3943',
    image_url: 'http://res.cloudinary.com/benlegendj/image/upload/v1561843898/property/iuaqakp4nrm8tzccsddo.png',
    contact: '4949494921',
    owner: 'asdf@gmail.com',
    flags: [],
  },
  sample_property1: {
    propertyId: 3,
    status: 'goog',
    state: 'kenya',
    city: 'nairobi',
    type: 'two',
    price: '40000',
    address: '3943',
    image_url: 'http://res.cloudinary.com/benlegendj/image/upload/v1561843898/property/iuaqakp4nrm8tzccsddo.png',
    contact: '4949494921',
    owner: 'benlegendj@gmail.com',
    flags: [],
  },
  newPrice: {
    price: 120484848,
  },
  invalidPrice: {
    price: 'sdfghjk',
  },
  flag: {
    reason: 'price',
    description: 'the price is very high',
  },
  invalidFlag: {
    reason: '',
    description: 'the price is very high',
  },
};

module.exports = utils;
