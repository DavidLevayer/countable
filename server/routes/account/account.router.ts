import { Controller, Get } from 'ts-express-decorators';
import { CrudRouter } from '../crud.router';
import { AccountService } from '../../services/account/account.service';

@Controller('/account')
export class PingRouter implements CrudRouter {

  constructor(private accountService: AccountService) {
  }

  @Get('/')
  public getAll(req, res) {

    return this.accountService.getAll().then((rows) => {
      res.json(rows);
    }).catch(err => {
      // Log error
      console.error(err);
      // Set response status and message
      res.status(500);
      res.json({
        message: 'An error occurs while getting accounts'
      });
    });
  }
}
