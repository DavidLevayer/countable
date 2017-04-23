import { Service } from 'ts-express-decorators';
import { DatabaseService } from '../database/database.service';
import { CrudService } from '../crud.service';
import { Category } from '../../models/category/category';
import { Subcategory } from '../../models/category/subcategory';
import { NumberUtils } from '../../utils/number.utils';

@Service()
export class CategoryService implements CrudService {

  constructor(private databaseService: DatabaseService) {
  }

  get(id: number, details?: boolean): Promise<Category[]> {

    let query: string;

    if (details) {
      query = 'SELECT C.id as catId, C.name as catName, ' +
        'S.id as subId, S.name as subName, IFNULL(ROUND(SUM(T.amount),2),0) as subBalance ' +
        'FROM Category as C LEFT JOIN Subcategory as S ON C.id = S.refCategory ' +
        'LEFT JOIN MoneyTransaction as T on S.id = T.refSubcategory WHERE C.id = ? GROUP BY S.id;';
    } else {
      query = 'SELECT C.id as catId, C.name as catName, S.id as subId, S.name as subName ' +
        'FROM Category as C LEFT JOIN Subcategory as S ON C.id = S.refCategory WHERE C.id = ?;';
    }

    return this.databaseService.select(query, id).then(rows => {
      return this.extractCategories(rows, details);
    });
  }

  getAll(details?: boolean): Promise<Category[]> {

    let query: string;

    if (details) {
      query = 'SELECT C.id as catId, C.name as catName, ' +
        'S.id as subId, S.name as subName, IFNULL(ROUND(SUM(T.amount),2),0) as subBalance ' +
        'FROM Category as C LEFT JOIN Subcategory as S ON C.id = S.refCategory ' +
        'LEFT JOIN MoneyTransaction as T on S.id = T.refSubcategory GROUP BY S.id;';
    } else {
      query = 'SELECT C.id as catId, C.name as catName, S.id as subId, S.name as subName ' +
        'FROM Category as C LEFT JOIN Subcategory as S ON C.id = S.refCategory;';
    }

    return this.databaseService.select(query, []).then(rows => {
      return this.extractCategories(rows, details);
    });
  }

  private extractCategories(rows: any[], details?: boolean): Category[] {

    let map: Map<number, Category> = new Map();
    for (let row of rows) {

      if (!map.has(row.catId)) {
        // Create category object if it's the first time we see this category
        let category: Category = new Category();
        category.id = row.catId;
        category.name = row.catName;
        if (details) {
          category.balance = 0;
        }
        map.set(row.catId, category);
      }

      if (row.subId) {
        let subcategory: Subcategory = new Subcategory();
        subcategory.id = row.subId;
        subcategory.name = row.subName;
        let parentCategory: Category = map.get(row.catId);
        if (details) {
          subcategory.balance = row.subBalance;
          parentCategory.balance += row.subBalance;
          // Somehow, sometimes, there is a lot a decimal digits...
          parentCategory.balance = NumberUtils.round(parentCategory.balance);
        }
        parentCategory.subcategories.push(subcategory);
      }
    }

    return Array.from(map.values());
  }

  create(category: Category): Promise<Category> {

    const query = 'INSERT INTO Category (name) VALUES (?);';
    let insertedId: number;

    return this.databaseService.insert(query, category.name).then(id => {
      insertedId = id;
      if (category.subcategories && category.subcategories.length > 0) {

        return this.insertSubcategories(insertedId, category);
      }
    }).then(() => {
      return this.get(insertedId);
    });
  }

  update(category: Category): Promise<Category> {

    const query = 'UPDATE Category SET name = ? WHERE id = ?;';
    return this.databaseService.update(query, category.name, category.id).then(() => {
      // Update subcategories
      return this.updateSubcategories(category.id, category);
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

  private updateSubcategories(categoryId: number, category: Category): Promise<number> {

    const insertSubquery = 'INSERT INTO Subcategory (name, refCategory) VALUES (?, ?); ';
    const updateSubquery = 'UPDATE Subcategory SET name = ? WHERE id = ?; ';
    const deleteSubquery = 'DELETE FROM Subcategory WHERE id = ?; ';
    let queries: Promise<number>[] = [];

    return this.get(categoryId).then((res: Category[]) => {

      let currentCategory: Category = res[ 0 ];

      // Store current subcategories in a map object
      let map: Map<number, string> = new Map();
      let ids: Set<number> = new Set();
      currentCategory.subcategories.forEach(subcategory => {
        map.set(subcategory.id, subcategory.name);
      });

      // Diff between current subcategories (in database) and new subcategories
      category.subcategories.forEach((subcategory: Subcategory) => {

        if (subcategory.id === null || typeof subcategory.id === 'undefined') {
          // Create new subcategory
          queries.push(this.databaseService.insert(insertSubquery, subcategory.name, String(category.id)));
          return;
        }

        // Store ids for later (search for delete)
        ids.add(subcategory.id);

        if (map.has(subcategory.id)) {
          // Update existing subcategory
          if (subcategory.name !== map.get(subcategory.id)) {
            queries.push(this.databaseService.update(updateSubquery, subcategory.name, String(subcategory.id)));
          }
        }
      });

      map.forEach((name, id) => {
        if (!ids.has(id)) {
          // Remove subcategory
          queries.push(this.databaseService.delete(deleteSubquery, String(id)));
        }
      });

      return Promise.all(queries).then(values => {
        return values.reduce((a, b) => a + b, 0);
      });
    });
  }

  private deleteSubcategories(categoryId: number): Promise<boolean> {
    const query = 'DELETE FROM Subcategory WHERE refCategory = ?;';
    return this.databaseService.delete(query, categoryId);
  }
}
