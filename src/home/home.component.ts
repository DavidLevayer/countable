import { Component, OnInit } from '@angular/core';
import { Account } from '../shared/model/account';
import { Category } from '../shared/model/category';
import { AccountService } from '../account/account.service';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',

  styleUrls: [
    '../shared/scss/highlight.common.scss',
    '../shared/scss/callout.common.scss'
  ]
})
export class HomeComponent implements OnInit {

  /** List of accounts */
  accounts: Account[] = [];
  /** List of categories */
  categories: Category[] = [];
  /** Contains an eventual error */
  error: Error;

  constructor(private accountService: AccountService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {

    // Get categories
    this.categoryService.getAll(true).subscribe(
      res => this.categories = res,
      err => this.error = err
    );

    // Get accounts
    this.accountService.getAll().subscribe(
      res => this.accounts = res,
      err => this.error = err
    );
  }
}
