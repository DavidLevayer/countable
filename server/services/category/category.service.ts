import { Service } from 'ts-express-decorators';
import { DatabaseService } from '../database/database.service';
import { CrudService } from '../crud.service';
import { Category } from '../../models/category/category';
import { Subcategory } from '../../models/category/subcategory';

@Service()
export class CategoryService implements CrudService {

  constructor(private databaseService: DatabaseService) {
  }

  get(id: number): Promise<Category> {

    const query = 'SELECT C.id as catId, C.name as catName, S.id as subId, S.name as subName ' +
      'FROM Category as C LEFT JOIN Subcategory as S ON C.id = S.refCategory WHERE C.id = ?;';

    return this.databaseService.select(query, id).then(rows => {
      return this.extractCategories(rows);
    });
  }

  getAll(): Promise<Category[]> {

    const query = 'SELECT C.id as catId, C.name as catName, S.id as subId, S.name as subName ' +
      'FROM Category as C LEFT JOIN Subcategory as S ON C.id = S.refCategory;';

    return this.databaseService.select(query, []).then(rows => {
      return this.extractCategories(rows);
    });
  }

  private extractCategories(rows: any[]): Category[] {

    let map: Map<number, Category> = new Map();
    for (let row of rows) {

      if (!map.has(row.catId)) {
        // Create category object if it's the first time we see this category
        let category: Category = new Category();
        category.id = row.catId;
        category.name = row.catName;
        map.set(row.catId, category);
      }

      if (row.subId) {
        let subcategory: Subcategory = new Subcategory();
        subcategory.id = row.subId;
        subcategory.name = row.subName;
        map.get(row.catId).subcategories.push(subcategory);
      }
    }

    return Array.from(map.values());
  }

  create(category: Category): Promise<Category> {

    const query = 'INSERT INTO Category (name) VALUES (?);';
    let insertedId: number;

    return this.databaseService.insert(query, category.name).then(id => {
      insertedId = id;
      return this.insertSubcategories(insertedId, category);
    }).then(() => {
      return this.get(insertedId);
    });
  }

  update(category: Category): Promise<Category> {

    const query = 'UPDATE Category SET name = ? WHERE id = ?;';
    return this.databaseService.update(query, category.name, category.id).then(() => {
      // Remove all existing subcategories
      return this.deleteSubcategories(category.id);
    }).then(() => {
      // Add update subcategories
      return this.insertSubcategories(category.id, category);
    }).then(() => {
      // Return newly updated category
      return this.get(category.id);
    });
  }

  delete(id: number): Promise<boolean> {

    return this.deleteSubcategories(id).then(() => {
      const query = 'DELETE FROM Category WHERE id = ?;';
      return this.databaseService.delete(query, id).then((changes: number) => {
        return changes > 0;
      });
    });
  }

  private insertSubcategories(categoryId: number, category: Category): Promise<number> {
    let subquery = 'INSERT INTO Subcategory (name, refCategory) VALUES ';

    let params: String[] = [];
    category.subcategories.forEach((subCategory: Subcategory) => {
      subquery += '(?, ?),';
      params.push(subCategory.name);
      params.push(String(categoryId));
    });

    subquery = subquery.substr(0, subquery.length - 1).concat(';');
    return this.databaseService.insert(subquery, ...params);
  }

  private deleteSubcategories(categoryId: number): Promise<boolean> {
    const query = 'DELETE FROM Subcategory WHERE refCategory = ?;';
    return this.databaseService.delete(query, categoryId);
  }
}
