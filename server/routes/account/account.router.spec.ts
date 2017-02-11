import {} from 'mocha';
import { app, appStarted } from '../../app';
import { suite, test } from 'mocha-typescript';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

@suite('Account')
class AccountTest {

  before(done) {
    // Ensure app is fully started
    appStarted.then(() => {
      done();
    });
  }

  @test 'should get all accounts'(done) {

    chai.request(app).get('/api/v1/account').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(3);
      res.body[ 0 ].should.have.property('id').eql(1);
      res.body[ 0 ].should.have.property('name').eql('test-account1');
      done();
    });
  }

  @test 'should get an account'(done) {

    chai.request(app).get('/api/v1/account/2').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      res.body[ 0 ].should.have.property('id').eql(2);
      res.body[ 0 ].should.have.property('name').eql('test-account2');
      done();
    });
  }

  @test 'should not get an account with unknown id'(done) {

    chai.request(app).get('/api/v1/account/4').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(0);
      done();
    });
  }

  @test 'should handle error while getting an account'(done) {

    chai.request(app).get('/api/v1/account/azerty').end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message')
        .eql('Bad request, parameter request.params.id. Cast error. Expression value is not a number.');
      done();
    });
  }

  @test 'should create an account'(done) {

    let params: any = { name: 'new account' };
    let expectedRes: any = { id: 4, name: 'new account' };

    chai.request(app).post('/api/v1/account/').send(params).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      res.body[ 0 ].should.eql(expectedRes);
      done();
    });
  }

  @test 'should not create an account if name is missing'(done) {

    let params: any = { account: 'new account' };

    chai.request(app).post('/api/v1/account/').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Parameter request.body.name is required');
      done();
    });
  }

  @test 'should not create an account if name is already used'(done) {

    let params: any = { name: 'test-account1' };

    chai.request(app).post('/api/v1/account/').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Account name \'test-account1\' is already used');
      done();
    });
  }

  @test 'should update an account'(done) {

    let params: any = { name: 'updated account' };
    let expectedRes: any = { id: 2, name: 'updated account' };

    chai.request(app).put('/api/v1/account/2').send(params).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      res.body[ 0 ].should.eql(expectedRes);
      done();
    });
  }

  @test 'should not update an account if name is already used'(done) {

    let params: any = { name: 'test-account1' };

    chai.request(app).put('/api/v1/account/2').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Account name \'test-account1\' is already used');
      done();
    });
  }

  @test 'should delete an account'(done) {

    chai.request(app).delete('/api/v1/account/2').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(true);
      done();
    });
  }

  @test 'should not delete an account with unknow id'(done) {

    chai.request(app).delete('/api/v1/account/5').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(false);
      done();
    });
  }
}
