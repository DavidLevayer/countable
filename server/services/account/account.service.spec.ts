import {} from 'mocha';
import { test, suite } from 'mocha-typescript';
import { AccountService } from './account.service';
import { DatabaseServiceMock } from '../database/database.service.mock';

let chai = require('chai');
let expect = chai.expect;

@suite('Account service')
class AccountServiceTest {

  private service;
  private databaseServiceMock;

  before() {
    this.databaseServiceMock = new DatabaseServiceMock();
    this.service = new AccountService(this.databaseServiceMock);
  }

  @test 'should get all accounts'(done) {
    let expectedRes = [ { id: 1, name: 'account' } ];
    this.databaseServiceMock.toReturn = expectedRes;
    this.service.getAll().then((res) => {
      expect(res).to.be.a('array');
      expect(res).to.eql(expectedRes);
      done();
    })
  }
}
