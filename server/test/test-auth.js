const chai = require('chai');
const chaiHttp = require('chai-http');
const utils = require('./setup');
const { app } = require('../app');
chai.use(chaiHttp);
const { expect } = chai;

describe('test server', () => {

  it('should test sign up with no input', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should test user sign up', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(utils.user)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body.message).equals('User registered successfully');
        done();
      });
  });

  it('should test double user sign up', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(utils.user)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(409);
        expect(res.body.error).equals('user with asdf@gmail.com already exists please login');
        done();
      });
  });

  it('should test user login', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(utils.userLogin1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body.message).equals('logged in successfully');

        done();
      });
  });

  it('should invalid user login', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(utils.invalid_login)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.error).equals('Invalid user login credentials');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('user login without fields', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send({ email: '' })
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(400);
        expect(res.body.error).equals('email is required');
        done();
      });
  });
});
