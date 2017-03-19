import * as Express from 'express';
import { ServerLoader, IServerLifecycle } from 'ts-express-decorators';
import Path = require('path');
import { Exception } from 'ts-httpexceptions';
import GlobalResponseMiddleware from './middlewares/global-response.middleware';

export class Server extends ServerLoader implements IServerLifecycle {
  /**
   * In your constructor set the global endpoint and configure the folder to scan the controllers.
   * You can start the http and https server.
   */
  constructor() {
    super();

    const appPath: string = Path.resolve(__dirname);

    // Mounts api routes
    this.mount('/api/v1', appPath + '/routes/**/*.router.js')
      .createHttpServer(9876);

    this.mount('api/v1', appPath + '/services/**/*.service.js');
  }

  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  $onMountingMiddlewares(): void|Promise<any> {

    const bodyParser = require('body-parser');

    this
      .use(ServerLoader.AcceptMime('application/json'))
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: false
      }))
      .use(GlobalResponseMiddleware);

    return null;
  }

  public $onReady() {
    /* tslint:disable:no-console */
    console.log('Server started on port 9876...');
    /* tslint:enable:no-console */
  }

  public $onServerInitError(err) {
    console.error(err);
  }

  public $onError(error: any, request: Express.Request, response: Express.Response, next: Function): void {

    if (response.headersSent) {
      return next(error);
    }

    if (error instanceof Exception) {
      response.status(error.status).send({message: error.message});
      return next();
    }

    if (typeof error === 'string') {
      response.status(404).send({message: error});
      return next();
    }

    response.status(error.status || 500).send({message: 'Internal Error'});
    console.error(error);
    return next();
  }
}

let server: Server = new Server();
export const appStarted = server.start();
export const app: Express.Application = server.getExpressApp();
