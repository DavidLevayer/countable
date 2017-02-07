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
      done();
    });
  }

  @test 'should get an account'(done) {

    chai.request(app).get('/api/v1/account/123').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  }

  @test 'should handle error while getting an account'(done) {

    chai.request(app).get('/api/v1/account/azerty').end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Bad request, parameter request.params.id. Cast error. Expression value is not a number.');
      done();
    });
  }
}
