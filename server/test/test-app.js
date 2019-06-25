const utils = require('./setup')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')

chai.use(chaiHttp)
const { expect } = chai;


describe('test server', () => {

    it('should test sign up with no input', (done) => {

        chai.request(app)
            .post('/auth/signup')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(400)
                done()
            })
    })

    it('should test user sign up', (done) => {
        let user = utils.user
        chai.request(app)
            .post('/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(201)
                done()
            })
    })


})
