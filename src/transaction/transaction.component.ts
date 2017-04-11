import { Component, OnInit } from '@angular/core';
import { Transaction } from './transaction';
import { TransactionService } from './transaction.service';
import { AccountService } from '../account/account.service';
import { CategoryService } from '../category/category.service';
import { Account } from '../account/account';
import { Category } from '../category/category';

@Component({
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: [
    '../shared/scss/card.common.scss',
    '../shared/scss/highlight.common.scss',
    '../shared/scss/callout.common.scss',
    './transaction.component.scss'
  ]
})
export class TransactionComponent implements OnInit {

  /** List of accounts */
  accounts: Account[] = [];
  /** List of categories */
  categories: Category[] = [];
  /** List of transactions */
  transactions: Transaction[] = [];
  /** The to-be-created transaction */
  newTransaction: Transaction = new Transaction();
  /** Id of the transaction we are currently editing */
  editingTransactionId = 0;
  /** Contains an eventual error */
  error: string;
  /** Date picker options */
  datepickerOpts = {
    icon: 'fa fa-calendar',
    autoclose: true,
    format: 'MM dd, yyyy'
  };

  constructor(private transactionService: TransactionService,
              private accountService: AccountService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.accountService.getAll().subscribe(
      res => {
        this.accounts = res;
        // Select first account in the list
        if (this.accounts.length > 0) {
          this.newTransaction.account = this.accounts[ 0 ];
        }
      },
      err => this.error = err
    );
    this.categoryService.getAll().subscribe(
      res => {
        this.categories = res.filter((category) => {
          return category.subcategories.length > 0;
        });
        // Select first subcategories in the list
        if (this.categories.length > 0) {
          // No need to check if category has any subcategories due to previous filter
          this.newTransaction.subcategory = this.categories[ 0 ].subcategories[ 0 ];
        }
      },
      err => this.error = err
    );
    this.transactionService.getAll().subscribe(
      res => this.transactions = res,
      err => this.error = err
    );
  }

  create(): void {
    if (this.isTransactionValid(this.newTransaction)) {
      // Reset error message
      this.error = '';
      // Reset time on transaction's date
      this.removeTransactionTime(this.newTransaction);
      // Call service to create new transaction
      this.transactionService.create(this.newTransaction).subscribe(res => {
          if (res.length === 1) {
            this.transactions.push(res[ 0 ]);
          }
          this.newTransaction = new Transaction();
        },
        err => this.error = err
      );
    } else {
      this.error = 'Invalid transaction. Operation cancelled.'
    }
  }

  delete(id: number): void {
    this.transactionService.delete(id).subscribe(res => {
        if (res) {
          this.transactions = this.transactions.filter((trans) => trans.id !== id);
        } else {
          this.error = 'Cannot delete transaction #' + id + ': server returns failure status.';
        }
      },
      err => this.error = err
    );
  }

  toggleEdit(id: number): void {
    this.editingTransactionId = id;
  }

  isTransactionValid(transaction: Transaction): boolean {

    if (
      transaction.amount === 0 ||
      transaction.account.id === 0 ||
      transaction.subcategory.id === 0
    ) {
      return false;
    }
    return true;
  }

  private removeTransactionTime(transaction: Transaction): void {

    let hours: number = transaction.date.getHours();
    let minutes: number = transaction.date.getMinutes();
    let secondes: number = transaction.date.getSeconds();

    transaction.date.setTime(transaction.date.getTime() - hours * 60 * 60 * 1000
      - minutes * 60 * 1000 - secondes * 1000);
  }
}
