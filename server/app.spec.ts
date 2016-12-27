import {} from 'mocha';
import { app } from './app';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();

describe('App', () => {

  it('should handle 404', (done) => {
    chai.request(app).get('/not/a/route').end((err, res) => {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Not Found');
      done();
    });
  });
});
