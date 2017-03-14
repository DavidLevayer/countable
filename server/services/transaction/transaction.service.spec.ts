import {} from 'mocha';
import { test, suite } from 'mocha-typescript';
import { DatabaseServiceMock } from '../database/database.service.mock';
import { TransactionService } from './transaction.service';
import { Transaction } from '../../models/transaction/transaction';
import { Account } from '../../models/account/account';
import { Subcategory } from '../../models/category/subcategory';

let chai = require('chai');
let expect = chai.expect;

@suite('Transaction service')
class TransactionServiceTest {

  private service: TransactionService;
  private databaseServiceMock: any;

  before() {
    this.databaseServiceMock = new DatabaseServiceMock();
    this.service = new TransactionService(this.databaseServiceMock);
  }

  @test 'should get all transactions'(done) {

    this.databaseServiceMock.toReturn = [ this.getRawTransactionMock() ];
    let expectedRes = [ this.getTransactionMock() ];

    this.service.getAll().then((res) => {
      expect(res).to.be.a('array');
      expect(res).to.eql(expectedRes);
      done();
    });
  }

  @test 'should get a transaction'(done) {

    this.databaseServiceMock.toReturn = [ this.getRawTransactionMock() ];
    let expectedRes = [ this.getTransactionMock() ];

    this.service.get(1).then((res) => {
      expect(res).to.be.a('array');
      expect(res).to.eql(expectedRes);
      done();
    });
  }

  @test 'should create a transaction'(done) {

    this.databaseServiceMock.toReturn = [ this.getRawTransactionMock() ];
    let expectedRes = [ this.getTransactionMock() ];

    this.service.create(this.getTransactionMock()).then((res) => {
      expect(res).to.be.a('array');
      expect(res).to.eql(expectedRes);
      done();
    });
  }

  @test 'should update a transaction'(done) {

    this.databaseServiceMock.toReturn = [ this.getRawTransactionMock() ];
    let expectedRes = [ this.getTransactionMock() ];

    this.service.update(this.getTransactionMock()).then((res) => {
      expect(res).to.be.a('array');
      expect(res).to.eql(expectedRes);
      done();
    });
  }

  private getRawTransactionMock(): any {
    return {
      transactionId: 1,
      amount: 12.34,
      transactionDate: '12 mars 2017 06:04:48',
      accountId: 1,
      accountName: 'test-account',
      subcategoryId: 1,
      subcategoryName: 'test-subcategory',
      categoryId: 1,
      categoryName: 'test-category'
    };
  }

  private getTransactionMock(): Transaction {
    let account: Account = new Account(1, 'test-account');
    let subcategory: Subcategory = new Subcategory(1, 'test-subcategory');

    let transaction: Transaction = new Transaction();
    transaction.id = 1;
    transaction.amount = 12.34;
    transaction.date = new Date('12 mars 2017 06:04:48');
    transaction.account = account;
    transaction.subcategory = subcategory;
    transaction.parentCategoryId = 1;
    transaction.parentCategoryName = 'test-category';

    return transaction;
  }
}
