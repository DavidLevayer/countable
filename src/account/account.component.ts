import { Component, OnInit } from '@angular/core';
import { Account } from './account';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.component.html',
  styleUrls: [
    '../shared/scss/card.common.scss',
    '../shared/scss/highlight.common.scss',
    '../shared/scss/callout.common.scss'
  ]
})
export class AccountComponent implements OnInit {

  /** List of accounts */
  accounts: Account[] = [];
  /** Name of the to-be-created account */
  accountName = '';
  /** Id of the account we are currently editing */
  editingAccountId = 0;
  /** Contains an eventual error */
  error: string;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getAll().subscribe(
      res => this.accounts = res,
      err => this.error = err
    );
  }

  create(): void {
    if (this.accountName.length > 0) {
      let account: Account = new Account();
      account.name = this.accountName;
      this.accountService.create(account).subscribe(res => {
          if (res.length === 1) {
            this.accounts.push(res[ 0 ]);
          }
          this.accountName = '';
        },
        err => this.error = err
      );
    }
  }

  update(account: Account): void {
    if (this.editingAccountId >= 0) {
      this.accountService.update(account).subscribe(() => {
          this.editingAccountId = 0;
        },
        err => this.error = err
      );
    }
  }

  delete(id: number): void {
    this.accountService.delete(id).subscribe(res => {
        if (res) {
          this.accounts = this.accounts.filter((account) => account.id !== id);
        } else {
          this.error = 'Cannot delete account #' + id + ': server returns failure status.';
        }
      },
      err => this.error = err
    );
  }

  toggleEdit(id: number): void {
    this.editingAccountId = id;
  }
}
