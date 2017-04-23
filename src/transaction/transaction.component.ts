import { Component, OnInit } from '@angular/core';
import { Transaction } from '../shared/model/transaction';
import { TransactionService } from './transaction.service';
import { AccountService } from '../account/account.service';
import { CategoryService } from '../category/category.service';
import { Account } from '../shared/model/account';
import { Category } from '../shared/model/category';
import { Observable } from 'rxjs';
import { Error } from '../shared/error';
import { NumberUtils } from '../shared/utils/number.utils';

@Component({
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',

  styleUrls: [
    '../shared/scss/card.common.scss',
    '../shared/scss/highlight.common.scss',
    '../shared/scss/callout.common.scss',
    '../shared/scss/pagination.common.scss',
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
  error: Error;
  /** Date picker options */
  datepickerOpts = {
    icon: 'fa fa-calendar',
    autoclose: true,
    format: 'MM dd, yyyy'
  };
  /** Current page */
  page = 1;
  /** Number of transaction per page */
  transactionPerPage = 10;

  constructor(private transactionService: TransactionService,
              private accountService: AccountService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {

    // Get categories
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

    // Get accounts
    let accountObs = this.accountService.getAll();
    accountObs.subscribe(
      res => {
        this.accounts = res;
        // Select first account in the list
        if (this.accounts.length > 0) {
          this.newTransaction.account = this.accounts[ 0 ];
        }
      },
      err => this.error = err
    );

    // Get transactions
    let transactionObs = this.transactionService.getAll();
    transactionObs.subscribe(
      res => {
        this.transactions = res;
        // Sort transaction by date
        this.sortTransactions();
      },
      err => this.error = err
    );

    Observable.forkJoin(accountObs, transactionObs).subscribe(res => {
      // We assume that transactions and accounts attributes are set
      this.calculateBalances();
    });
  }

  create(): void {
    if (this.isTransactionValid(this.newTransaction)) {
      // Reset error message
      this.error = null;
      // Reset time on transaction's date
      this.removeTransactionTime(this.newTransaction);
      // Call service to create new transaction
      this.transactionService.create(this.newTransaction).subscribe(res => {
          if (res.length === 1) {
            this.transactions.push(res[ 0 ]);
            this.sortTransactions();
            this.calculateBalances();
          }
          this.newTransaction = new Transaction();
        },
        err => this.error = err
      );
    } else {
      this.error = new Error('Invalid transaction. Operation cancelled.');
    }
  }

  delete(id: number): void {
    this.transactionService.delete(id).subscribe(res => {
        if (res) {
          this.transactions = this.transactions.filter((trans) => trans.id !== id);
          this.error = null;
        } else {
          this.error = new Error('Cannot delete transaction #' + id + ': server returns failure status.');
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

  private sortTransactions(): void {
    this.transactions.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  private calculateBalances(): void {

    // Initiate balances
    let accountBalances: Map<number, number> = new Map();
    let firstTransaction: Map<number, boolean> = new Map();
    this.accounts.forEach(account => {
      accountBalances.set(account.id, 0);
      firstTransaction.set(account.id, true);
    });

    // Set transaction balances
    for (let i = this.transactions.length - 1; i >= 0; i--) {
      let transaction: Transaction = this.transactions[ i ];
      let newBalance: number = accountBalances.get(transaction.account.id) + transaction.amount;
      transaction.balance = NumberUtils.round(newBalance);
      accountBalances.set(transaction.account.id, newBalance);
    }
  }

  private removeTransactionTime(transaction: Transaction): void {

    let hours: number = transaction.date.getHours();
    let minutes: number = transaction.date.getMinutes();
    let seconds: number = transaction.date.getSeconds();

    transaction.date.setTime(transaction.date.getTime() - hours * 60 * 60 * 1000
      - minutes * 60 * 1000 - seconds * 1000);
  }

  amountStyle(amount: number): string {
    if (amount >= 0) {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }
}
