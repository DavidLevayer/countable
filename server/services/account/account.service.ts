import { Service } from 'ts-express-decorators';
import { DatabaseService } from '../database/database.service';
import { CrudService } from '../crud.service';

@Service()
export class AccountService implements CrudService {

  constructor(private databaseService: DatabaseService) {
  }

  get(objectId: number): Promise<any> {

    const query = 'SELECT * FROM Account WHERE accountId = ?;';
    return this.databaseService.select(query, objectId);
  }

  getAll(): Promise<any[]> {

    const query = 'SELECT * FROM Account;';
    return this.databaseService.select(query, []);
  }

  create(accountName: string): Promise<any> {

    const query = 'INSERT INTO Account (name) VALUES (?);';
    return this.databaseService.insert(query, accountName).then(insertedId => {
      return this.get(insertedId);
    });
  }

  update(object: any): Promise<any> {
    return null;
  }

  delete(object: any): Promise<boolean> {
    return null;
  }
}
