# PropertyPro
Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

[![Build Status](https://travis-ci.com/Kitingu/PropertyPro.svg?branch=develop)](https://travis-ci.com/Kitingu/PropertyPro)
[![Coverage Status](https://coveralls.io/repos/github/Kitingu/PropertyPro/badge.svg?branch=develop)](https://coveralls.io/github/Kitingu/PropertyPro?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/70a37e06812a257be534/maintainability)](https://codeclimate.com/github/Kitingu/PropertyPro/maintainability)

### Required Features

1. User can sign up.
2. User can sign in.
3. User (agent) can post a property advert.
4. User (agent) can update the details of a property advert.
5. User (agent) can mark his/her posted advert as sold.
6. User (agent) can delete a property advert.
7. User can view all properties adverts.
8. User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.
9. User can view a specific property advert.

#### Optional Features

* User can reset password.
* flag/report​ a posted AD as fraudulent.
* User can add multiple pictures to a posted ad.
* The application should display a Google Map with Marker showing the red-flag or
intervention location.

#### Endpoints
| Method        | Endpoint                 | Description|
| ------------- | --------------------------|------------|
| POST           |`/auth/signup`   |User create an account|
| POST          | `/auth/signin`   |Sign in / log in a user |
| POST        | `/property`    |Create a property advert|
| GET | `/property`|Fetch all available property adverts|
| GET          | `/property/<:property-id>`|get a specific advert|
| DELETE       | `/property/<:propertyId>` |Delete an delete advert you own|
| PATCH         | `/property/<:propertyId>/price`| Update the price of a property advert|
| PATCH          | `/property/<:property-id>/sold`       |Mark an advert as sold|
| GET  |`/api/v1/property?type=property-type` |get all available property adverts of specific type|
| POST          | `/property/<:property-id>/flag`      |Flag an advert as fraudulent|
| GET          | `/property/<:property-id>/flag`      |Get all flags of a given property|



## Install and run the application:
First ensure that you have Nodejs and npm installed in your computer

1. Clone this repository and get to the project directory
```bash
    git clone https://github.com/kitingu/propertypro.git
    cd propertyPro
    git checkout develop
```
2. Install the project dependencies
 ```bash
    npm install
```
4. Run the application:
 ```bash
    npm run dev
```


## Test the application:
```bash
    npm run test
```



#### Where to get the User interface

Navigate to https://kitingu.github.io/PropertyPro/index.html to view the pages

#### Documentation: [Heroku](https://propertypro-v2.herokuapp.com/api/v2)

#### Author: Benedict Mwendwa

#### License: [MIT](https://github.com/Kitingu/PropertyPro/blob/develop/LICENSE)
