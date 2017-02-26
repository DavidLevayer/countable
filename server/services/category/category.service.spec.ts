import {} from 'mocha';
import { test, suite } from 'mocha-typescript';
import { DatabaseServiceMock } from '../database/database.service.mock';
import { CategoryService } from './category.service';
import { Category } from '../../models/category/category';
import { Subcategory } from '../../models/category/subcategory';

let chai = require('chai');
let expect = chai.expect;

@suite('Category service')
class CategoryServiceTest {

  private service: CategoryService;
  private databaseServiceMock: any;

  before() {
    this.databaseServiceMock = new DatabaseServiceMock();
    this.service = new CategoryService(this.databaseServiceMock);
  }

  @test 'should get all categories'(done) {

    this.databaseServiceMock.toReturn = [
      { catId: 1, catName: 'cat1', subId: 11, subName: 'sub1' }
    ];

    let category: Category = new Category(1, 'cat1');
    let subCategory: Subcategory = new Subcategory(11, 'sub1');
    category.subcategories = [ subCategory ];
    let expectedRes = [ category ];

    this.service.getAll().then((res) => {
      expect(res).to.be.a('array');
      expect(res).to.eql(expectedRes);
      done();
    });
  }

  @test 'should get a category'(done) {

    this.databaseServiceMock.toReturn = [
      { catId: 1, catName: 'cat1', subId: 11, subName: 'sub1' }
    ];

    let category: Category = new Category(1, 'cat1');
    let subCategory: Subcategory = new Subcategory(11, 'sub1');
    category.subcategories = [ subCategory ];
    let expectedRes = [ category ];

    this.service.get(1).then((res) => {
      expect(res).to.be.a('array');
      expect(res).to.eql(expectedRes);
      done();
    });
  }

  @test 'should create a category'(done) {

    this.databaseServiceMock.toReturn = [
      { catId: 1, catName: 'cat1', subId: 11, subName: 'sub1' }
    ];

    let category: Category = new Category(1, 'cat1');
    let subCategory: Subcategory = new Subcategory(11, 'sub1');
    category.subcategories = [ subCategory ];
    let expectedRes = [ category ];

    this.service.create(category).then((res) => {
      expect(res).to.be.a('array');
      expect(res).to.eql(expectedRes);
      done();
    });
  }
}
