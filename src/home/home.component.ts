import { Component } from '@angular/core';
import { Account } from '../shared/model/account';
import { Category } from '../shared/model/category';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',

  styleUrls: [
    '../shared/scss/highlight.common.scss',
    '../shared/scss/callout.common.scss'
  ]
})
export class HomeComponent {

  /** List of accounts */
  accounts: Account[] = [];
  /** List of categories */
  categories: Category[] = [];
  /** Contains an eventual error */
  error: Error;
}
