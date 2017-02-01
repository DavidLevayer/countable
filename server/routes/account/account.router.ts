import { Controller, Get, PathParams, Response } from 'ts-express-decorators';
import { AccountService } from '../../services/account/account.service';
import { BasicRouter } from '../basic.router';

@Controller('/account')
export class AccountRouter extends BasicRouter {

  constructor(private accountService: AccountService) {
    super();
  }

  @Get('/')
  public getAll(@Response() res) {

    return this.accountService.getAll().then((rows) => {
      res.json(rows);
    }).catch(err => {
      this.logError(err);
      this.throwError(res, 'An error has occured while getting accounts');
    });
  }

  @Get('/:id')
  public get(@PathParams('id') id: number, @Response() res) {

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
}
