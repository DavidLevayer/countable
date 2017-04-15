import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Transaction } from './transaction';

@Injectable()
export class TransactionService extends BaseService {

  /** Server url for getting transactions */
  private transactionUrl = '/transaction';

  /** Basic constructor */
  public constructor(private http: Http) {
    super();
  }

  /**
   * Returns the list of transactions
   * @returns {Observable<Account[]>}
   */
  public getAll(): Observable<Transaction[]> {

    return this.http.get(this.baseUrl + this.transactionUrl).map(this.extractArray).catch(this.extractError);
  }

  /**
   * Creates a new transaction
   * @returns {Observable<Transaction>}
   */
  public create(transaction: Transaction): Observable<Transaction[]> {

    return this.http.post(this.baseUrl + this.transactionUrl, transaction, { headers: this.baseHeaders })
      .map(this.extractArray).catch(this.extractError);
  }

  /**
   * Updates an existing transaction
   * @returns {Observable<Transaction>}
   */
  public update(transaction: Transaction): Observable<Transaction[]> {

    return this.http.put(this.baseUrl + this.transactionUrl + '/' + transaction.id, transaction,
      { headers: this.baseHeaders }).map(this.extractArray).catch(this.extractError);
  }

  /**
   * Deletes given transaction
   * @returns {Observable<boolean>}
   */
  public delete(transactionId: number): Observable<boolean> {

    return this.http.delete(this.baseUrl + this.transactionUrl + '/' + transactionId)
      .map(this.extractSuccess).catch(this.extractError);
  }
}
