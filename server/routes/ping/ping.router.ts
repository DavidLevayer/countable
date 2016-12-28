import { Controller, Get } from "ts-express-decorators";

@Controller('/')
export class PingRouter {

  @Get('')
  public get(req, res) {
    res.json({
      message: 'Api working!'
    });
  }
}
