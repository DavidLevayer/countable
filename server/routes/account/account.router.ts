import { Controller, Get } from 'ts-express-decorators';
import { AccountService } from '../../services/account/account.service';
import { BasicRouter } from '../basic.router';

@Controller('/account')
export class AccountRouter extends BasicRouter {

  constructor(private accountService: AccountService) {
    super();
  }

  @Get('/')
  public getAll(req, res) {

    return this.accountService.getAll().then((rows) => {
      res.json(rows);
    }).catch(err => {
      this.throwError(res, 'An error has occured while getting accounts');
    });
  }

  @Get('/:id')
  public get(req, res) {

    let id: number = +req.params.id;

    if (isNaN(id)) {
      this.throwError(res, 'Invalid identifier: ' + req.params.id, 400);
    } else {
      return this.accountService.get(id).then((rows) => {
        res.json(rows);
      }).catch(err => {
        this.throwError(res, 'An error has occured while getting account ' + id);
      });
    }
  }
}
