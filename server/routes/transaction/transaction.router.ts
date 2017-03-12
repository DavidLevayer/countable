import { Controller, Get, Response, PathParams } from 'ts-express-decorators';
import { BasicRouter } from '../basic.router';
import * as Express from 'express';
import { TransactionService } from '../../services/transaction/transaction.service';

@Controller('/transaction')
export class TransactionRouter extends BasicRouter {

  constructor(private transactionService: TransactionService) {
    super();
  }

  @Get('/')
  public getAll(@Response() res: Express.Response) {

    return this.transactionService.getAll().then((rows) => {
      res.json(rows);
    }).catch(err => {
      this.logError(err);
      this.throwError(res, 'An error has occured while getting transactions');
    });
  }

  @Get('/:id')
  public get(@PathParams('id') id: number, @Response() res: Express.Response) {

    return this.transactionService.get(id).then((rows) => {
      res.json(rows);
    }).catch(err => {
      this.logError(err);
      this.throwError(res, 'An error has occured while getting transaction ' + id);
    });
  }
}
