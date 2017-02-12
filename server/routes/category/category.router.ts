import { Controller, Get, Response, PathParams } from 'ts-express-decorators';
import { BasicRouter } from '../basic.router';
import * as Express from 'express';
import { CategoryService } from '../../services/category/category.service';

@Controller('/category')
export class CategoryRouter extends BasicRouter {

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
}
