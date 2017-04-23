import { Account } from './account';
import { Subcategory } from './subcategory';
export class Transaction {

  id: number;
  amount: number;
  date: Date;
  account: Account;
  subcategory: Subcategory;

  parentCategoryName: string;
  parentCategoryId: number;

  balance: number;

  constructor(id?: number, amount?: number) {
    this.id = id;
    this.amount = amount;
    this.date = new Date();
    this.account = new Account();
    this.subcategory = new Subcategory();
  }
}
