import {} from 'mocha';
import { app } from '../../app';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();

describe('Ping', () => {

  it('should ping api', (done) => {
    chai.request(app).get('/api/v1').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Api working!');
      done();
    });
  });
});
