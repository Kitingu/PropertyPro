const chai = require('chai');
const chaiHttp = require('chai-http');
const utils = require('./setup');
const { app } = require('../app');
chai.use(chaiHttp);
const { expect } = chai;

describe('test server', () => {
    it('handle 404 error', (done) => {
        chai.request(app)
            .patch('/api/v2/prope')
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("Resource not found")
                expect(res).to.have.status(404)
                done()
            })
    })

    it('handle 405 error', (done) => {
        chai.request(app)
            .put('/api/v2/property')
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("This method is not allowed")
                expect(res).to.have.status(405)
                done()
            })
    })

    it('handle get by non integer', (done) => {
        chai.request(app)
            .get('/api/v2/property/abc')
            .send(utils.flag)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error).equals("property id should only be a number")
                expect(res).to.have.status(400)

                done()
            })
    })



})
