import { Router, Request, Response, NextFunction } from 'express';

class PingRouter {

  router: Router;

  /**
   * Initialize the PingRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Heroes.
   */
  public getApiStatus(req: Request, res: Response, next: NextFunction) {
    res.json({
      message: 'Api working!'
    });
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getApiStatus);
  }

}

// Export configured router
let pingRouter = new PingRouter().router;
export { pingRouter }
