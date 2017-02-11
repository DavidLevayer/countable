import { Controller, Get, Response } from 'ts-express-decorators';

@Controller('/')
export class PingRouter {

  @Get('')
  public get(@Response() res) {
    res.json({
      message: 'Api working!'
    });
  }
}
