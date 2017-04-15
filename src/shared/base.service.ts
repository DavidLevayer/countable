import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Error } from './error';

export class BaseService {

  protected baseUrl = 'http://localhost:9876/api/v1';

  protected baseHeaders;

  constructor() {
    this.baseHeaders = new Headers();
    this.baseHeaders.append('Content-Type', 'application/json');
  }

  protected extractArray(res: Response) {
    let body = res.json();
    return body || [];
  }

  protected extractObject(res: Response) {
    let body = res.json();
    return body || {};
  }

  protected extractError(res: Response) {
    let body = res.json();
    let error: Error = new Error(body.message || 'Something went horribly wrong...', body.details);
    return Observable.throw(error);
  }

  protected extractSuccess(res: Response) {
    let body = res.json();
    if (!body.success || typeof body.success !== 'boolean') {
      return Observable.throw('Expected \'success: boolean\' field to be set.');
    }
    return body.success;
  }
}
