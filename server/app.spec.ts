import {} from 'mocha';
import { app, appStarted } from './app';
import { test, suite } from 'mocha-typescript';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

@suite('App')
class AppTest {

  before(done) {
    // Ensure app is fully started
    appStarted.then(() => {
      done();
    })
  }

  @test 'should handle 404'(done) {
    chai.request(app).get('/not/a/route').end((err, res) => {
      res.should.have.status(404);
      done();
    });
  }
}
