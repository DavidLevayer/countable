import { Service } from 'ts-express-decorators';
import { DatabaseService } from '../database/database.service';
import { CrudService } from '../crud.service';

@Service()
export class AccountService implements CrudService {

  constructor(private databaseService: DatabaseService) {
  }

  get(objectId: number): Promise<any> {

    const query = 'SELECT * FROM Account WHERE accountId = ?;';
    return this.databaseService.executeQuery(query, objectId);
  }

  getAll(): Promise<any[]> {

    const query = 'SELECT * FROM Account;';
    return this.databaseService.executeQuery(query, []);
  }

  create(object: any): Promise<any> {
    return null;
  }

  update(object: any): Promise<any> {
    return null;
  }

  delete(object: any): Promise<boolean> {
    return null;
  }
}
