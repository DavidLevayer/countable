import {} from 'mocha';
import { app, appStarted } from '../../app';
import { suite, test } from 'mocha-typescript';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

@suite('Transaction')
class TransactionTest {

  before(done) {
    // Ensure app is fully started
    appStarted.then(() => {
      done();
    });
  }

  @test 'should get all transactions'(done) {

    chai.request(app).get('/api/v1/transaction').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(3);
      res.body[ 0 ].should.have.property('id').eql(1);
      res.body[ 0 ].should.have.property('amount').eql(10);
      res.body[ 0 ].should.have.property('account').eql({ id: 1, name: 'test-account1' });
      res.body[ 0 ].should.have.property('subcategory').eql({ id: 1, name: 'test-subcat-1.1' });
      res.body[ 0 ].should.have.property('date').eql('2017-03-14T13:04:48.844Z');
      res.body[ 0 ].should.have.property('parentCategoryId').eql(1);
      res.body[ 0 ].should.have.property('parentCategoryName').eql('test-cat1');
      done();
    });
  }

  @test 'should get a transaction'(done) {

    chai.request(app).get('/api/v1/transaction/2').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      res.body[ 0 ].should.have.property('id').eql(2);
      res.body[ 0 ].should.have.property('amount').eql(20);
      res.body[ 0 ].should.have.property('account').eql({ id: 1, name: 'test-account1' });
      res.body[ 0 ].should.have.property('subcategory').eql({ id: 1, name: 'test-subcat-1.1' });
      res.body[ 0 ].should.have.property('date').eql('2017-03-14T14:04:48.844Z');
      res.body[ 0 ].should.have.property('parentCategoryId').eql(1);
      res.body[ 0 ].should.have.property('parentCategoryName').eql('test-cat1');
      done();
    });
  }

  @test 'should not get a transaction with unknown id'(done) {

    chai.request(app).get('/api/v1/transaction/99').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(0);
      done();
    });
  }

  @test 'should handle error while getting a transaction'(done) {

    chai.request(app).get('/api/v1/transaction/azerty').end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message')
        .eql('Bad request, parameter request.params.id. Cast error. Expression value is not a number.');
      done();
    });
  }

  @test 'should create a transaction'(done) {

    let params: any = { amount: 147, date: '2017-03-18T13:04:48.844Z', account: { id: 1 }, subcategory: { id: 1 } };
    let expectedRes: any = {
      id: 11,
      amount: 147,
      date: '2017-03-18T13:04:48.844Z',
      account: {
        id: 1,
        name: 'test-account1'
      },
      subcategory: {
        id: 1,
        name: 'test-subcat-1.1'
      },
      parentCategoryId: 1,
      parentCategoryName: 'test-cat1'
    };

    chai.request(app).post('/api/v1/transaction/').send(params).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      res.body[ 0 ].should.eql(expectedRes);
      done();
    });
  }

  @test 'should not create a transaction if amount is missing'(done) {

    let params: any = { date: '2017-03-18T13:04:48.844Z', accountId: 1, subcategoryId: 1 };

    chai.request(app).post('/api/v1/transaction/').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Parameter request.body.amount is required');
      done();
    });
  }

  @test 'should not create a transaction if date is missing'(done) {

    let params: any = { amount: 12, accountId: 1, subcategoryId: 1 };

    chai.request(app).post('/api/v1/transaction/').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Parameter request.body.date is required');
      done();
    });
  }

  @test 'should update a transaction'(done) {

    let params: any = { id: 11, amount: 1050, date: '2017-03-20T13:04:48.844Z', account: { id: 1 }, subcategory: { id: 2 } };
    let expectedRes: any = {
      id: 10,
      amount: 1050,
      date: '2017-03-20T13:04:48.844Z',
      account: {
        id: 1,
        name: 'test-account1'
      },
      subcategory: {
        id: 2,
        name: 'test-subcat-1.2'
      },
      parentCategoryId: 1,
      parentCategoryName: 'test-cat1'
    };

    chai.request(app).put('/api/v1/transaction/10').send(params).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(1);
      res.body[ 0 ].should.eql(expectedRes);
      done();
    });
  }

  @test 'should not update a transaction if amount is missing'(done) {

    let params: any = { date: '2017-03-18T13:04:48.844Z', accountId: 1, subcategoryId: 1 };

    chai.request(app).put('/api/v1/transaction/10').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Parameter request.body.amount is required');
      done();
    });
  }

  @test 'should not update a transaction if date is missing'(done) {

    let params: any = { amount: 12, accountId: 1, subcategoryId: 1 };

    chai.request(app).put('/api/v1/transaction/10').send(params).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').eql('Parameter request.body.date is required');
      done();
    });
  }
}
