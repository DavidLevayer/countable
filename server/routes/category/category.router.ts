import { Controller, Get, Response, PathParams, BodyParams, Post } from 'ts-express-decorators';
import { BasicRouter } from '../basic.router';
import * as Express from 'express';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category/category';
import { isUndefined } from 'util';
import { Subcategory } from '../../models/category/subcategory';

@Controller('/category')
export class CategoryRouter extends BasicRouter {

  private static ERR_CATEGORY_NAME = 'SQLITE_CONSTRAINT: UNIQUE constraint failed: Category.name';

  constructor(private categoryService: CategoryService) {
    super();
  }

  @Get('/')
  public getAll(@Response() res: Express.Response) {

    return this.categoryService.getAll().then((rows) => {
      res.json(rows);
    }).catch(err => {
      this.logError(err);
      this.throwError(res, 'An error has occured while getting categories');
    });
  }

  @Get('/:id')
  public get(@PathParams('id') id: number, @Response() res: Express.Response) {

    return this.categoryService.get(id).then((rows) => {
      res.json(rows);
    }).catch(err => {
      this.logError(err);
      this.throwError(res, 'An error has occured while getting category ' + id);
    });
  }

  @Post('/')
  public create(@BodyParams() category: Category, @Response() res: Express.Response) {

    if (isUndefined(category.name) || category.name.length === 0) {
      // No category name is specified
      this.throwError(res, 'Parameter request.body.name is required', 400);
    } else {

      // Check if subcategories are valid
      if (this.hasDuplicatedSubcategory(category)) {
        this.throwError(res, 'Parameter request.body.subcategories is invalid: duplicated subcategory names', 400);
        return;
      }

      // Create a new category
      return this.categoryService.create(category).then((rows) => {
        res.json(rows);
      }).catch((err: Error) => {

        if (err.message === CategoryRouter.ERR_CATEGORY_NAME) {
          // Given category name is already used
          this.throwError(res, 'Category name \'' + category.name + '\' is already used', 400);
        } else {
          // Internal error
          this.logError(err.message, err.stack);
          this.throwError(res, 'An error has occured while creating category \'' + category.name + '\'');
        }
      });
    }
  }

  /**
   * Checks if given category has no duplicates in subcategories field
   * @param category the category object to examine
   * @returns True if given category has one or more duplicated subcategories, false otherwise.
   */
  private hasDuplicatedSubcategory(category: Category): boolean {

    let subcategoriesNames: string[] = category.subcategories.map((subcategory: Subcategory) => {
      return subcategory.name;
    });
    return subcategoriesNames.length !== new Set(subcategoriesNames).size;
  }
}
