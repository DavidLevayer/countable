import { Response } from '@angular/http';

export class BaseService {

  protected baseUrl = 'http://localhost:9876/api/v1';

  protected extractArray(res: Response) {
    let body = res.json();
    return body || [];
  }

  protected extractObject(res: Response) {
    let body = res.json();
    return body || {};
  }
}
