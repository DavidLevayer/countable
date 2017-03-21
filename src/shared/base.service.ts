import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

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
    return Observable.throw(body.message || 'Something went horribly wrong...');
  }
}
