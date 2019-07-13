const chai = require('chai');
const chaiHttp = require('chai-http');
const utils = require('./setup');
const { app } = require('../app');
const { users } = require('../models/user');

chai.use(chaiHttp);
const { expect } = chai;


describe('test server', () => {
  before(() => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(utils.user1)
      .end((err, res) => {
      });
  });

  after(() => {
    users.length = 0;
  });

  it('should test sign up with no input', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should test user sign up', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signup')
      .send(utils.user1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(409);
        expect(res.body.error).equals('user with nelson@gmail.com already exists please login');

        done();
      });
  });

  it('should test user login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
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
      .post('/api/v1/auth/signin')
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
      .post('/api/v1/auth/signin')
      .send({ email: '' })
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(400);
        expect(res.body.error).equals('email is required');
        done();
      });
  });
});
