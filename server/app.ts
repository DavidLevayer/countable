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

    this.setEndpoint('/api/v1')
      .scan(appPath + '/routes/**/*.router.js')
      .createHttpServer(9876);
  }

  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  $onMountingMiddlewares(): void|Promise<any> {

    const bodyParser = require('body-parser');

    this
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

  static Initialize = (): Promise<any> => new Server().start();

}

Server.Initialize();
