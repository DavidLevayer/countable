import { Controller, Get, Response, PathParams, BodyParams, Post, Put } from 'ts-express-decorators';
import { BasicRouter } from '../basic.router';
import * as Express from 'express';
import { TransactionService } from '../../services/transaction/transaction.service';
import { Transaction } from '../../models/transaction/transaction';
import { isUndefined } from 'util';
import { isDate } from 'rxjs/util/isDate';

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

  @Post('/')
  public create(@BodyParams() transaction: Transaction, @Response() res: Express.Response) {

    if (isUndefined(transaction.amount)) {
      // No transaction name is specified
      this.throwError(res, 'Parameter request.body.amount is required', 400);
    } else if (isUndefined(transaction.date)) {
      // No transaction name is specified
      this.throwError(res, 'Parameter request.body.date is required', 400);
    } else {

      // Create a new transaction
      return this.transactionService.create(transaction).then((rows) => {
        res.json(rows);
      }).catch((err: Error) => {
        // Internal error
        this.logError(err.message, err.stack);
        this.throwError(res, 'An error has occured while creating transaction');
      });
    }
  }

  @Put('/:id')
  public update(@PathParams('id') id: number, @BodyParams() transaction: Transaction, @Response() res: Express.Response) {

    if (isUndefined(transaction.amount)) {
      // No transaction name is specified
      this.throwError(res, 'Parameter request.body.amount is required', 400);
    } else if (isUndefined(transaction.date)) {
      // No transaction name is specified
      this.throwError(res, 'Parameter request.body.date is required', 400);
    } else {

      // Override an eventual transaction id: route parameter has priority
      transaction.id = id;

      // Update category
      return this.transactionService.update(transaction).then((rows) => {
        res.json(rows);
      }).catch((err: Error) => {
        // Internal error
        this.logError(err.message, err.stack);
        this.throwError(res, 'An error has occured while updating transaction');
      });
    }
  }
}
