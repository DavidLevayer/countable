import { CrudRouter } from './crud.router';

export class BasicRouter implements CrudRouter {

  /**
   * Set status and returns a JSON object containing the error message
   * @param res
   * @param message
   * @param status
   */
  public throwError(res, message: string, status = 500, details = ''): void {
    // Set response status and message
    res.status(status);
    res.json({
      message: message,
      details: details
    });
  }

  /**
   * Log the given message as an error
   * @param message
   */
  public logError(message: string, stack?: string): void {
    console.error(message);
  }
}
