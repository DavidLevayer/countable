import { Service } from 'ts-express-decorators';
import { IDatabaseConnector, QueryType } from './database.connector';
import { SQLiteConnector } from './sqlite.connector';
import { populationQueries } from './population-queries';

@Service()
export class DatabaseService {

  private databaseConnector: IDatabaseConnector;

  constructor() {

    let db = new SQLiteConnector('./countable-database.sqlite', true);
    populationQueries.forEach(function (query) {
      db.executeQuery(QueryType.INSERT, query, []);
    });
    this.databaseConnector = db;
  }

  public select(query: string, ...params: any[]): Promise<any[]> {
    return this.databaseConnector.executeQuery(QueryType.SELECT, query, ...params);
  }

  public insert(query: string, ...params: any[]): Promise<any[]> {
    return this.databaseConnector.executeQuery(QueryType.INSERT, query, ...params);
  }

  public update(query: string, ...params: any[]): Promise<any[]> {
    return this.databaseConnector.executeQuery(QueryType.UPDATE, query, ...params);
  }

  public delete(query: string, ...params: any[]): Promise<any[]> {
    return this.databaseConnector.executeQuery(QueryType.DELETE, query, ...params);
  }
}
