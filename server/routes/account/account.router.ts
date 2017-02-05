import { Controller, Get, PathParams, Response, Post, BodyParams } from 'ts-express-decorators';
import { AccountService } from '../../services/account/account.service';
import { BasicRouter } from '../basic.router';
import * as Express from "express";
import { isUndefined } from 'util';

@Controller('/account')
export class AccountRouter extends BasicRouter {

  private static ERR_ACCOUNT_NAME: string = 'SQLITE_CONSTRAINT: UNIQUE constraint failed: Account.name';

  constructor(private accountService: AccountService) {
    super();
  }

  @Get('/')
  public getAll(@Response() res: Express.Response) {

    return this.accountService.getAll().then((rows) => {
      res.json(rows);
    }).catch(err => {
      this.logError(err);
      this.throwError(res, 'An error has occured while getting accounts');
    });
  }

  @Get('/:id')
  public get(@PathParams('id') id: number, @Response() res: Express.Response) {

    if (isNaN(id)) {
      this.throwError(res, 'Invalid identifier: ' + id, 400);
    } else {
      return this.accountService.get(id).then((rows) => {
        res.json(rows);
      }).catch(err => {
        this.logError(err);
        this.throwError(res, 'An error has occured while getting account ' + id);
      });
    }
  }

  @Post('/')
  public create(@BodyParams('account') account: any, @Response() res: Express.Response) {

    if (isUndefined(account)) {
      // No account is specified
      this.throwError(res, 'Parameter request.body.account is required', 400);
    } else if (isUndefined(account.name) || account.name.length === 0) {
      // Specified account has no name
      this.throwError(res, 'Parameter request.body.account.name is required', 400);
    } else {
      // Try to create a new account
      return this.accountService.create(account).then((rows) => {
        res.json(rows);
      }).catch((err: Error) => {

        if (err.message === AccountRouter.ERR_ACCOUNT_NAME) {
          // Given account name is already used
          this.throwError(res, 'Account name \'' + account.name + '\' is already used', 400);
        } else {
          // Internal error
          this.logError(err.message, err.stack);
          this.throwError(res, 'An error has occured while creating account \'' + account.name + '\'');
        }
      });
    }
  }
}
