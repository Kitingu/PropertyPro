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
            .post('/api/v1/auth/signup')
            .send(utils.user)
            .end((err, res) => {
                token = res.body.data.token
                done()
            })

    })

    afterEach((done) => {
        properties.length = 0
        done()
    })

    it('create property advert', (done) => {

        chai.request(app)
            .post('/api/v1/property')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('image', 'server/test/test.jpg', 'test.jpg')
            .field('type', 'miniflat')
            .field('state', 'Kenya')
            .field('city', 'Nairobi')
            .field('price', '4000000000')
            .field('address', 122649)
            .field('contact', 07153578331)

            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(201)
                done()
            })
    })


    it('create property without token', (done) => {

        chai.request(app)
            .post('/api/v1/property')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('image', 'server/test/test.jpg', 'test.jpg')
            .field('type', 'miniflat')
            .field('state', 'Kenya')
            .field('city', 'Nairobi')
            .field('price', '4000000000')
            .field('address', 122649)
            .field('contact', 07153578331)

            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400)
                done()
            })
    })

    it('create property without image upload', (done) => {

        chai.request(app)
            .post('/api/v1/property')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('type', 'miniflat')
            .field('state', 'Kenya')
            .field('city', 'Nairobi')
            .field('price', '4000000000')
            .field('address', 122649)
            .field('contact', 07153578331)

            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400)
                done()
            })

    })
    it('create property with invalid user input', (done) => {

        chai.request(app)
            .post('/api/v1/property')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('image', 'server/test/test.jpg', 'test.jpg')
            .field('type', 'miniflat')
            .field('state', 'Kenya')
            .field('city', 'h1232......')
            .field('price', '4000000000')
            .field('address', 122649)
            .field('contact', 07153578331)

            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400)
                done()
            })
    })

    it('should test get all properties', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .get('/api/v1/property')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)

                done()
            })
    })

    it('should test get all properties when non exists', (done) => {
        chai.request(app)
            .get('/api/v1/property')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)

                done()
            })
    })


    it('should test get a non existing single properties', (done) => {
        chai.request(app)
            .get('/api/v1/property/9')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404)

                done()
            })
    })


    it('delete property advert', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .delete('/api/v1/property/2')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)
                done()
            })

    })

    it('gets a single property advert', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .get('/api/v1/property/2')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)
                done()
            })

    })

    it('gets a single property by type', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .get('/api/v1/property?type=two')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)
                done()
            })

    })

    it('gets a single property by type ', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .get('/api/v1/property?type=car')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404)
                done()
            })

    })


    it('delete property non existing advert', (done) => {

        properties.push(utils.sample_property)
        chai.request(app)
            .delete('/api/v1/property/5')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404)
                done()
            })

    })

    it('delete property that you dont own advert', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .delete('/api/v1/property/3')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(401)
                done()
            })

    })
    it('mark property advert as sold', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v1/property/2/sold')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)
                done()
            })

    })
    it('mark property as sold non existing advert', (done) => {

        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v1/property/5/sold')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404)
                done()
            })

    })

    it('mark property as sold that you dont own advert', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .patch('/api/v1/property/3/sold')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(401)
                done()
            })

    })


    it('update price', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v1/property/2/price')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.newPrice)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)
                done()
            })

    })
    it('update price with invalid input', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v1/property/2/price')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.invalidPrice)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400)
                done()
            })

    })

    it('update price for a property you dont own', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .patch('/api/v1/property/3/price')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.newPrice)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(401)
                done()
            })

    })

    it('update price for non existing property', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .patch('/api/v1/property/9/price')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.newPrice)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404)
                done()
            })

    })

    it('flag a property', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .patch('/api/v1/property/3/flag')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200)
                done()
            })

    })

    it('flag a property with invalid details', (done) => {
        properties.push(utils.sample_property1)
        chai.request(app)
            .patch('/api/v1/property/3/flag')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.invalidFlag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400)
                done()
            })

    })


    it('flag a non existing property', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v1/property/9/flag')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404)
                done()
            })

    })

    it('flag a property don\'t you own', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v1/property/2/flag')
            .set('Authorization', `Bearer ${token}`)
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(403)
                done()
            })

    })

    it('handle 405 error', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .patch('/api/v1/prope')
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(405)
                done()
            })
    })

    it('handle get by non integer', (done) => {
        properties.push(utils.sample_property)
        chai.request(app)
            .get('/api/v1/property/abc')
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400)
                done()
            })
    })
})
