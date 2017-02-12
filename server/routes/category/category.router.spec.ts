import {} from 'mocha';
import { app, appStarted } from '../../app';
import { suite, test } from 'mocha-typescript';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

@suite('Category')
class CategoryTest {

  before(done) {
    // Ensure app is fully started
    appStarted.then(() => {
      done();
    });
  }

  @test 'should get all categories'(done) {

    chai.request(app).get('/api/v1/category').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(3);
      res.body[ 0 ].should.have.property('id').eql(1);
      res.body[ 0 ].should.have.property('name').eql('test-cat1');
      res.body[ 0 ].should.have.property('subcategories');
      res.body[ 0 ].subcategories.should.be.a('array');
      res.body[ 0 ].subcategories.should.have.length(2);
      res.body[ 0 ].subcategories[0].should.have.property('id').eql(1);
      res.body[ 0 ].subcategories[0].should.have.property('name').eql('test-subcat-1.1');
      done();
    });
  }

  @test 'should get a category'(done) {

    chai.request(app).get('/api/v1/category/2').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      console.log(res.body[0]);
      res.body[ 0 ].should.have.property('id').eql(2);
      res.body[ 0 ].should.have.property('name').eql('test-cat2');
      res.body[ 0 ].should.have.property('subcategories');
      res.body[ 0 ].subcategories.should.be.a('array');
      res.body[ 0 ].subcategories.should.have.length(1);
      res.body[ 0 ].subcategories[0].should.have.property('id').eql(3);
      res.body[ 0 ].subcategories[0].should.have.property('name').eql('test-subcat-2.1');
      done();
    });
  }

  @test 'should not get a category with unknown id'(done) {

    chai.request(app).get('/api/v1/category/4').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(0);
      done();
    });
  }

  @test 'should handle error while getting a category'(done) {

    chai.request(app).get('/api/v1/category/azerty').end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message')
        .eql('Bad request, parameter request.params.id. Cast error. Expression value is not a number.');
      done();
    });
  }
}
