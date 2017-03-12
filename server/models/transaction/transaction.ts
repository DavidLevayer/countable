import { JsonProperty } from 'ts-express-decorators';
import { Subcategory } from '../category/subcategory';
import { Account } from '../account/account';

export class Transaction {
  @JsonProperty()
  id: number;
  @JsonProperty()
  amount: number;
  @JsonProperty()
  date: Date;
  @JsonProperty({ use: Subcategory })
  subcategory: Subcategory;
  @JsonProperty({ use: Account })
  account: Account;
  parentCategoryId: number;
  parentCategoryName: string;

  constructor(id?: number, amount?: number) {
    this.id = id;
    this.amount = amount;
  }
}
