import { Controller, Get, PathParams, Response, Post, BodyParams } from 'ts-express-decorators';
import { AccountService } from '../../services/account/account.service';
import { BasicRouter } from '../basic.router';
import * as Express from "express";
import { isUndefined } from 'util';

@Controller('/account')
export class AccountRouter extends BasicRouter {

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

    // TODO Handle following case: an account with this name already exists

    if (isUndefined(account)) {
      this.throwError(res, 'Parameter request.body.account is required', 400);
    } else if (isUndefined(account.name) || account.name.length === 0) {
      this.throwError(res, 'Parameter request.body.account.name is required', 400);
    } else {
      return this.accountService.create(account).then((rows) => {
        res.json(rows);
      }).catch(err => {
        this.logError(err);
        this.throwError(res, 'An error has occured while creating account ' + account.name);
      });
    }
  }
}
