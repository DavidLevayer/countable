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

    return null;
  }

  update(category: Category): Promise<Category> {

    return null;
  }

  delete(id: number): Promise<boolean> {

    return null;
  }
}
