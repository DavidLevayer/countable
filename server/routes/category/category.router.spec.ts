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
      res.body.should.have.length(4);
      res.body[ 0 ].should.have.property('id').eql(1);
      res.body[ 0 ].should.have.property('name').eql('test-cat1');
      res.body[ 0 ].should.have.property('subcategories');
      res.body[ 0 ].subcategories.should.be.a('array');
      res.body[ 0 ].subcategories.should.have.length(2);
      res.body[ 0 ].subcategories[ 0 ].should.have.property('id').eql(1);
      res.body[ 0 ].subcategories[ 0 ].should.have.property('name').eql('test-subcat-1.1');
      done();
    });
  }

  @test 'should get a category'(done) {

    chai.request(app).get('/api/v1/category/2').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      res.body[ 0 ].should.have.property('id').eql(2);
      res.body[ 0 ].should.have.property('name').eql('test-cat2');
      res.body[ 0 ].should.have.property('subcategories');
      res.body[ 0 ].subcategories.should.be.a('array');
      res.body[ 0 ].subcategories.should.have.length(1);
      res.body[ 0 ].subcategories[ 0 ].should.have.property('id').eql(10);
      res.body[ 0 ].subcategories[ 0 ].should.have.property('name').eql('test-subcat-2.1');
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

  @test 'should create a category'(done) {

    let params: any = { name: 'new category', subcategories: [ { name: 'subcat1' }, { name: 'subcat2' } ] };
    let expectedRes: any = {
      id: 12,
      name: 'new category',
      subcategories: [ { id: 11, name: 'subcat1' }, { id: 12, name: 'subcat2' } ]
    };

    chai.request(app).post('/api/v1/category/').send(params).end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      res.body[ 0 ].should.eql(expectedRes);
      done();
    });
  }

  @test 'should create a category without subcategories'(done) {

    let params: any = { name: 'new category only' };
    let expectedRes: any = {
      id: 13,
      name: 'new category only',
      subcategories: []
    };

    chai.request(app).post('/api/v1/category/').send(params).end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      res.body[ 0 ].should.eql(expectedRes);
      done();
    });
  }

  @test 'should not create a category if name is missing'(done) {

    let params: any = { category: 'new category' };

    chai.request(app).post('/api/v1/category/').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Parameter request.body.name is required');
      done();
    });
  }

  @test 'should not create a category if name is already used'(done) {

    let params: any = { name: 'test-cat1' };

    chai.request(app).post('/api/v1/category/').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Category name \'test-cat1\' is already used');
      done();
    });
  }

  @test 'should not create a category if subcategories are duplicated'(done) {

    let params: any = { name: 'category with duplicates', subcategories: [ { name: 'subcat1' }, { name: 'subcat1' } ] };

    chai.request(app).post('/api/v1/category/').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Parameter request.body.subcategories is invalid: duplicated subcategory names');
      done();
    });
  }

  @test 'should update a category'(done) {

    let params: any = { name: 'test-cat10-update', subcategories: [ { name: 'subcat1' }, { name: 'subcat2' } ] };
    let expectedRes: any = {
      id: 10,
      name: 'test-cat10-update',
      subcategories: [ { id: 13, name: 'subcat1' }, { id: 14, name: 'subcat2' } ]
    };

    chai.request(app).put('/api/v1/category/10').send(params).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      res.body[ 0 ].should.eql(expectedRes);
      done();
    });
  }

  @test 'should not update a category if name is missing'(done) {

    let params: any = { category: 'update category' };

    chai.request(app).put('/api/v1/category/11').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Parameter request.body.name is required');
      done();
    });
  }

  @test 'should not update a category if name is already used'(done) {

    let params: any = { name: 'test-cat1' };

    chai.request(app).put('/api/v1/category/10').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Category name \'test-cat1\' is already used');
      done();
    });
  }

  @test 'should not update a category if subcategories are duplicated'(done) {

    let params: any = { name: 'category with duplicates', subcategories: [ { name: 'subcat1' }, { name: 'subcat1' } ] };

    chai.request(app).put('/api/v1/category/13').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Parameter request.body.subcategories is invalid: duplicated subcategory names');
      done();
    });
  }

  @test 'should delete a category'(done) {

    chai.request(app).delete('/api/v1/category/11').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(true);
      done();
    });
  }

  @test 'should not delete a category with unknown id'(done) {

    chai.request(app).delete('/api/v1/category/99').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(false);
      done();
    });
  }
}
