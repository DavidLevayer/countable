import { Component, OnInit } from '@angular/core';
import { Transaction } from './transaction';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: [
    '../shared/scss/card.common.scss',
    '../shared/scss/highlight.common.scss',
    '../shared/scss/callout.common.scss'
  ]
})
export class TransactionComponent implements OnInit {

  /** List of transactions */
  transactions: Transaction[] = [];
  /** The to-be-created transaction */
  newTransaction: Transaction = new Transaction();
  /** Id of the transaction we are currently editing */
  editingTransactionId = 0;
  /** Contains an eventual error */
  error: string;

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactionService.getAll().subscribe(
      res => this.transactions = res,
      err => this.error = err
    );
  }

  create(): void {
    if (this.isTransactionValid(this.newTransaction)) {
      this.transactionService.create(this.newTransaction).subscribe(res => {
          if (res.length === 1) {
            this.transactions.push(res[ 0 ]);
          }
          this.newTransaction = new Transaction();
        },
        err => this.error = err
      );
    }
  }

  update(transaction: Transaction): void {
    if (this.isTransactionValid(transaction)) {
      this.transactionService.update(transaction).subscribe(() => {
          this.editingTransactionId = 0;
        },
        err => this.error = err
      );
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
      typeof(transaction.date) !== 'Date' ||
      transaction.account.id === 0 ||
      transaction.subcategory.id === 0
    ) {
      return false;
    }
    return true;
  }
}
