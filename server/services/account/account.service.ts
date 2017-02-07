import { Service } from 'ts-express-decorators';
import { DatabaseService } from '../database/database.service';
import { CrudService } from '../crud.service';
import { Account } from '../../models/account/account';

@Service()
export class AccountService implements CrudService {

  constructor(private databaseService: DatabaseService) {
  }

  get(objectId: number): Promise<Account> {

    const query = 'SELECT * FROM Account WHERE id = ?;';
    return this.databaseService.select(query, objectId);
  }

  getAll(): Promise<Account[]> {

    const query = 'SELECT * FROM Account;';
    return this.databaseService.select(query, []);
  }

  create(account: Account): Promise<Account> {

    const query = 'INSERT INTO Account (name) VALUES (?);';
    return this.databaseService.insert(query, account.name).then(insertedId => {
      return this.get(insertedId);
    });
  }

  update(account: Account): Promise<Account> {

    const query = 'UPDATE Account SET name = ? WHERE id = ?;';
    return this.databaseService.update(query, account.name, account.id).then(() => account);
  }

  delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM Account WHERE id = ?;';
    return this.databaseService.delete(query, id).then((changes: number) => {
      return changes > 0;
    });
  }
}
