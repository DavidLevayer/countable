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
      res.body.should.have.length(3); console.log(res.body[0]);
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
      res.body.should.have.length(1); console.log(res.body[0]);
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
}
