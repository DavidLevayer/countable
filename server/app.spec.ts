import {} from 'mocha';
import { app, appStarted } from './app';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();

describe('App', () => {

  before(function (done) {
    // Ensure app is fully started
    appStarted.then(() => {
      done();
    })
  });

  it('should handle 404', (done) => {
    chai.request(app).get('/not/a/route').end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});
