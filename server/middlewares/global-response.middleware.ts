import * as Express from 'express';
import { IMiddleware, Middleware, Response } from "ts-express-decorators";

@Middleware()
export default class GlobalResponseMiddleware implements IMiddleware {

  use(@Response() res: Express.Response) {
    res.header('Access-Control-Allow-Origin', '*');
  }
}
