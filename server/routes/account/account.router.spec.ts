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
}
