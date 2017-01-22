import { CrudRouter } from './crud.router';

export class BasicRouter implements CrudRouter {

  /**
   * Log the error message, set status and returns a JSON object containing the error message
   * @param res
   * @param message
   * @param status
   */
  public throwError(res, message: string, status: number = 500): void {
    // Log error
    console.error('Error ' + status + ': ' + message);
    // Set response status and message
    res.status(status);
    res.json({
      message: message
    });
  }
}
