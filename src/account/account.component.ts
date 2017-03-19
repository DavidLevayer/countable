import { Component, OnInit } from '@angular/core';
import { Account } from './account';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.component.html',
  styleUrls: ['../shared/scss/card.common.scss']
})
export class AccountComponent implements OnInit {

  accounts: Account[] = [];

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getAll().subscribe(res => this.accounts = res);
  }
}
