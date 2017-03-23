import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { Http } from '@angular/http';
import { Account } from './account';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService extends BaseService {

  /** Server url for getting accounts */
  private accountUrl = '/account';

  /** Basic constructor */
  public constructor(private http: Http) {
    super();
  }

  /**
   * Returns the list of accounts
   * @returns {Observable<Account[]>}
   */
  public getAll(): Observable<Account[]> {

    return this.http.get(this.baseUrl + this.accountUrl).map(this.extractArray).catch(this.extractError);
  }

  /**
   * Creates a new account
   * @returns {Observable<Account>}
   */
  public create(account: Account): Observable<Account[]> {

    return this.http.post(this.baseUrl + this.accountUrl, account, { headers: this.baseHeaders })
      .map(this.extractArray).catch(this.extractError);
  }

  /**
   * Updates an existing account
   * @returns {Observable<Account>}
   */
  public update(account: Account): Observable<Account[]> {

    return this.http.put(this.baseUrl + this.accountUrl + '/' + account.id, account, { headers: this.baseHeaders })
      .map(this.extractArray).catch(this.extractError);
  }

  /**
   * Deletes given account
   * @returns {Observable<boolean>}
   */
  public delete(accountId: number): Observable<boolean> {

    return this.http.delete(this.baseUrl + this.accountUrl + '/' + accountId)
      .map(this.extractSuccess).catch(this.extractError);
  }
}
