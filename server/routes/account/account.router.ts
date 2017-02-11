import { Controller, Get, PathParams, Response, Post, BodyParams, Put, Delete } from 'ts-express-decorators';
import { AccountService } from '../../services/account/account.service';
import { BasicRouter } from '../basic.router';
import * as Express from 'express';
import { isUndefined } from 'util';
import { Account } from '../../models/account/account';

@Controller('/account')
export class AccountRouter extends BasicRouter {

  private static ERR_ACCOUNT_NAME = 'SQLITE_CONSTRAINT: UNIQUE constraint failed: Account.name';

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

    return this.accountService.get(id).then((rows) => {
      res.json(rows);
    }).catch(err => {
      this.logError(err);
      this.throwError(res, 'An error has occured while getting account ' + id);
    });
  }

  @Post('/')
  public create(@BodyParams() account: Account, @Response() res: Express.Response) {

    if (isUndefined(account.name) || account.name.length === 0) {
      // No account name is specified
      this.throwError(res, 'Parameter request.body.name is required', 400);
    } else {
      // Create a new account
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

  @Put('/:id')
  public update(@PathParams('id') id: number, @BodyParams() account: Account, @Response() res: Express.Response) {

    if (isUndefined(account.name) || account.name.length === 0) {
      // No account name is specified
      this.throwError(res, 'Parameter request.body.name is required', 400);
    } else {
      // Override an eventual account id: route parameter has priority
      account.id = id;
      // Update account
      return this.accountService.update(account).then((rows) => {
        res.json(rows);
      }).catch((err: Error) => {

        if (err.message === AccountRouter.ERR_ACCOUNT_NAME) {
          // Given account name is already used
          this.throwError(res, 'Account name \'' + account.name + '\' is already used', 400);
        } else {
          // Internal error
          this.logError(err.message, err.stack);
          this.throwError(res, 'An error has occured while updating account \'' + account.name + '\'');
        }
      });
    }
  }

  @Delete('/:id')
  public delete(@PathParams('id') id: number, @Response() res: Express.Response) {

    return this.accountService.delete(id).then(success => {
      res.json({success: success});
    }).catch((err: Error) => {
      this.logError(err.message, err.stack);
      this.throwError(res, 'An error has occured while removing account ' + id);
    });
  }
}
