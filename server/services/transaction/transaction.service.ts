import { Service } from 'ts-express-decorators';
import { DatabaseService } from '../database/database.service';
import { CrudService } from '../crud.service';
import { Transaction } from '../../models/transaction/transaction';
import { Account } from '../../models/account/account';
import { Subcategory } from '../../models/category/subcategory';

@Service()
export class TransactionService implements CrudService {

  constructor(private databaseService: DatabaseService) {
  }

  get(id: number): Promise<Transaction[]> {

    const query = 'SELECT T.id as transactionId, T.amount, T.transactionDate, A.id as accountId, A.name as accountName,' +
      ' C.id as categoryId, C.name as categoryName, SC.id as subcategoryId, SC.name as subcategoryName ' +
      'FROM MoneyTransaction as T JOIN Account as A ON T.refAccount = A.id JOIN Subcategory as SC ON ' +
      'T.refSubcategory = SC.id JOIN Category as C ON SC.refCategory = C.id WHERE T.id = ?;';

    return this.databaseService.select(query, id).then(rows => {
      return this.buildTransaction(rows);
    });
  }

  getAll(): Promise<Transaction[]> {

    const query = 'SELECT T.id as transactionId, T.amount, T.transactionDate, A.id as accountId, A.name as accountName,' +
      ' C.id as categoryId, C.name as categoryName, SC.id as subcategoryId, SC.name as subcategoryName ' +
      'FROM MoneyTransaction as T JOIN Account as A ON T.refAccount = A.id JOIN Subcategory as SC ON ' +
      'T.refSubcategory = SC.id JOIN Category as C ON SC.refCategory = C.id;';

    return this.databaseService.select(query, []).then(rows => {
      return this.buildTransaction(rows);
    });
  }

  create(transaction: Transaction): Promise<Transaction[]> {

    const query = 'INSERT INTO MoneyTransaction (amount, refAccount, refSubcategory, transactionDate) VALUES (?,?,?,?);';

    return this.databaseService.insert(
      query,
      transaction.amount,
      transaction.account.id,
      transaction.subcategory.id,
      transaction.date.toISOString()
    ).then(id => {
      return this.get(id);
    });
  }

  update(transaction: Transaction): Promise<Transaction[]> {

    const query = 'UPDATE MoneyTransaction SET amount = ?, refAccount = ?, refSubcategory = ?, transactionDate = ? WHERE id = ?;';

    return this.databaseService.update(
      query,
      transaction.amount,
      transaction.account.id,
      transaction.subcategory.id,
      transaction.date.toISOString()
    ).then(id => {
      return this.get(id);
    });
  }

  delete(id: number): Promise<boolean> {

    const query = 'DELETE FROM MoneyTransaction WHERE id = ?;';
    return this.databaseService.delete(query, id).then((changes: number) => {
      return changes > 0;
    });
  }

  private buildTransaction(rows: any): Transaction[] {

    let transactions: Transaction[] = [];

    for (let row of rows) {
      let account: Account = new Account(+row.accountId, row.accountName);
      let subcategory: Subcategory = new Subcategory(+row.subcategoryId, row.subcategoryName);

      let transaction: Transaction = new Transaction();
      transaction.id = row.transactionId;
      transaction.amount = row.amount;
      transaction.date = new Date(row.transactionDate);
      transaction.account = account;
      transaction.subcategory = subcategory;
      transaction.parentCategoryId = +row.categoryId;
      transaction.parentCategoryName = row.categoryName;

      transactions.push(transaction);
    }
    return transactions;
  }
}
