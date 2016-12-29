import 'express';
import { ServerLoader, IServerLifecycle } from 'ts-express-decorators';
import Path = require('path');

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
      }));

    return null;
  }

  public $onReady() {
    console.log('Server started on port 9876...');
  }

  public $onServerInitError(err) {
    console.error(err);
  }
}

let server: Server = new Server();
export const appStarted = server.start();
export const app: Express.Application = server.getExpressApp();
