import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Category } from '../shared/model/category';

@Injectable()
export class CategoryService extends BaseService {

  /** Server url for getting categories */
  private categoryUrl = '/category';

  /** Basic constructor */
  public constructor(private http: Http) {
    super();
  }

  /**
   * Returns the list of categories
   * @returns {Observable<Category[]>}
   */
  public getAll(details = false): Observable<Category[]> {
    let url: string;
    if (details) {
      url = this.baseUrl + this.categoryUrl + '?details=true';
    } else {
      url = this.baseUrl + this.categoryUrl;
    }
    return this.http.get(url).map(this.extractArray).catch(this.extractError);
  }

  /**
   * Creates a new category
   * @returns {Observable<Category>}
   */
  public create(category: Category): Observable<Category[]> {

    return this.http.post(this.baseUrl + this.categoryUrl, category, { headers: this.baseHeaders })
      .map(this.extractArray).catch(this.extractError);
  }

  /**
   * Updates an existing category
   * @returns {Observable<Category>}
   */
  public update(category: Category): Observable<Category[]> {

    return this.http.put(this.baseUrl + this.categoryUrl + '/' + category.id, category, { headers: this.baseHeaders })
      .map(this.extractArray).catch(this.extractError);
  }

  /**
   * Deletes given category
   * @returns {Observable<boolean>}
   */
  public delete(categoryId: number): Observable<boolean> {

    return this.http.delete(this.baseUrl + this.categoryUrl + '/' + categoryId)
      .map(this.extractSuccess).catch(this.extractError);
  }
}
