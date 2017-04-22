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

  accountChartLabels: string[] = [];
  accountChartData: number[] = [];

  categoryChartLabels: string[] = [];
  categoryChartData: number[] = [];

  subcategoryChartLabels: string[] = [];
  subcategoryChartData: number[] = [];

  doughnutChartType:string = 'doughnut';
  doughnutLegend:boolean = true;

  constructor(private accountService: AccountService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {

    // Get categories
    this.categoryService.getAll(true).subscribe(
      res => {
        this.categories = res;
        this.categories.forEach(category => {
          if(category.balance !== 0){
            this.categoryChartLabels.push(category.name);
            this.categoryChartData.push(category.balance);
          }
          category.subcategories.forEach(subcategory => {
            if(subcategory.balance !== 0){
              this.subcategoryChartLabels.push(subcategory.name);
              this.subcategoryChartData.push(subcategory.balance);
            }
          })
        });
      },
      err => this.error = err
    );

    // Get accounts
    this.accountService.getAll().subscribe(
      res => {
        this.accounts = res;
        this.accounts.forEach(account => {
          if(account.balance > 0){
            this.accountChartLabels.push(account.name);
            this.accountChartData.push(account.balance);
          }
        });
      },
      err => this.error = err
    );
  }
}
