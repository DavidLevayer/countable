import { Account } from '../account/account';
import { Subcategory } from '../category/subcategory';
export class Transaction {

  id: number;
  amount: number;
  date: Date;
  account: Account;
  subcategory: Subcategory;

  parentCategoryName: string;
  parentCategoryId: number;

  constructor(id?: number, amount?: number) {
    this.id = id;
    this.amount = amount;
    this.date = new Date();
    this.account = new Account();
    this.subcategory = new Subcategory();
  }
}
