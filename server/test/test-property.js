const utils = require('./setup')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')
const { Property, properties } = require('../models/property')
const fs = require('fs')
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
            .field('status', 'goodcondition')
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
            .field('status', 'goodcondition')
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

            .field('status', 'goodcondition')
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
            .field('status', '1226946444444444....')
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




})
