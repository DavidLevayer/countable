import { Controller, Get } from "ts-express-decorators";

@Controller('/')
export class PingRouter {

  @Get('')
  public get() {
    return { message: 'Api working!' };
  }
}
