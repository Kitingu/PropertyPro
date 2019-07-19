const utils = require('./setup')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')
const { properties } = require('../models/property')
chai.use(chaiHttp)
const { expect } = chai;

let token

describe('test properties', () => {

    before((done) => {

        chai.request(app)
            .post('/api/v2/auth/signup')
            .send(utils.user2)
            .end((err, res) => {
                token = res.body.data.token
                done()
            })
    })

    it('should test get all properties when non exists', (done) => {
        chai.request(app)
            .get('/api/v2/property')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)
                expect(res.body.message).equals("no available properties at the moment");
                done()
            })
    })


    it('create property advert', (done) => {

        chai.request(app)
            .post('/api/v2/property')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('image', 'server/test/test.jpg', 'test.jpg')
            .field('type', 'miniflat')
            .field('state', 'Kenya')
            .field('city', 'Nairobi')
            .field('price', '4000000000')
            .field('address', 122649)


            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message).equals("property advert created successfully");
                expect(res).to.have.status(201)
                done()
            })
    })

    it('gets a single property advert', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .get('/api/v2/property/1')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)
                expect(res.body.message).equals("property advert fetched successfully")
                done()
            })

    })
    it('update price', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v2/property/1/price')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.newPrice)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message).equals("Property updated successfully");

                expect(res).to.have.status(200)
                done()
            })

    })
    it('update price with invalid input', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v2/property/2/price')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.invalidPrice)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("price should only include numbers");
                expect(res).to.have.status(400)
                done()
            })

    })

    it.skip('update price for a property you dont own', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .patch('/api/v2/property/3/price')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.newPrice)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("you dont have the privilege to perform this task")
                expect(res).to.have.status(401)
                done()
            })

    })

    it('update price for non existing property', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .patch('/api/v2/property/9/price')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.newPrice)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("A property with id 9 does not exist");
                expect(res).to.have.status(404)
                done()
            })

    })

    it('mark property advert as sold', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v2/property/1/sold')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message).equals("property advert updated successfully");
                expect(res).to.have.status(200)
                done()
            })

    })

    it('mark property as sold non existing advert', (done) => {

        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v2/property/5/sold')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("A property with id 5 does not exist");

                expect(res).to.have.status(404)
                done()
            })

    })

    it.skip('mark property as sold that you dont own advert', (done) => {
        chai.request(app)
            .patch('/api/v2/property/3/sold')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(401)
                done()
            })

    })

    it('create property without token', (done) => {

        chai.request(app)
            .post('/api/v2/property')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('image', 'server/test/test.jpg', 'test.jpg')
            .field('type', 'miniflat')
            .field('state', 'Kenya')
            .field('city', 'Nairobi')
            .field('price', '4000000000')
            .field('address', 122649)


            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("please provide a valid token");
                expect(res).to.have.status(400)
                done()
            })
    })

    it('create property without image upload', (done) => {

        chai.request(app)
            .post('/api/v2/property')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('type', 'miniflat')
            .field('state', 'Kenya')
            .field('city', 'Nairobi')
            .field('price', '4000000000')
            .field('address', 122649)


            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("please provide an image of type png, gif or jpg");
                expect(res).to.have.status(400)
                done()
            })

    })
    it('create property with invalid user input', (done) => {

        chai.request(app)
            .post('/api/v2/property')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('image', 'server/test/test.jpg', 'test.jpg')
            .field('type', 'miniflat')
            .field('state', 'Kenya')
            .field('city', 'h1232......')
            .field('price', '4000000000')
            .field('address', 122649)


            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400)
                expect(res.body.error).equals("city should have at least three alphabetic characters");

                done()
            })
    })

    it('should test get all properties', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .get('/api/v2/property')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)
                expect(res.body.message).equals("properties fetched successfully");
                done()
            })
    })




    it('should test get a non existing single properties', (done) => {
        chai.request(app)
            .get('/api/v2/property/9')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404)
                expect(res.body.error).equals("A property with id 9 does not exist");
                done()
            })
    })

    it('gets a single property by type', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .get('/api/v2/property?type=miniflat')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message).equals("properties fetched successfully")
                expect(res).to.have.status(200)
                done()
            })

    })

    it('gets a single property by type ', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .get('/api/v2/property?type=car')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("couldnt find anything that matches the filters")
                expect(res).to.have.status(404)
                done()
            })

    })


    it('delete property non existing advert', (done) => {

        properties.push(utils.sample_property)
        chai.request(app)
            .delete('/api/v2/property/5')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("A property with id5 does not exist");
                expect(res).to.have.status(404)
                done()
            })

    })

    it.skip('delete property that you dont own advert', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .delete('/api/v1/property/3')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("you dont have the privilege to perform this task");
                expect(res).to.have.status(401)
                done()
            })

    })


    it.skip('flag a property', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .patch('/api/v1/property/3/flag')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message).equals("Property flagged successfully");
                expect(res).to.have.status(200)
                done()
            })

    })

    it.skip('flag a property with invalid details', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .patch('/api/v2/property/1/flag')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.invalidFlag)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("please provide a valid reason")
                expect(res).to.have.status(400)
                done()
            })

    })


    it.skip('flag a non existing property', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v1/property/9/flag')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("property does not exist")
                expect(res).to.have.status(404)
                done()
            })

    })

    it('flag a property that you own', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v2/property/1/flag')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("you can not flag your own property");
                expect(res).to.have.status(403)
                done()
            })

    })
    it('delete property advert', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .delete('/api/v2/property/1')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)
                expect(res.body.message).equals("advert deleted successfully");
                done()
            })

    })
})
