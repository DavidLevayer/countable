import { Service } from 'ts-express-decorators';
import { IDatabaseConnector } from './database.connector';
import { SQLiteConnector } from './sqlite.connector';
import { populationQueries } from './population-queries';

@Service()
export class DatabaseService {

  private databaseConnector: IDatabaseConnector;

  constructor() {

    let db = new SQLiteConnector('./countable-database.sqlite', true);
    populationQueries.forEach(function (query) {
      db.executeQuery(query, []);
    });
    this.databaseConnector = db;
  }

  public executeQuery(query: string, ...params: any[]): Promise<any[]> {
    return this.databaseConnector.executeQuery(query, ...params);
  }
}
