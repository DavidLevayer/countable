import { Service } from 'ts-express-decorators';
import { IDatabaseConnector, QueryType } from './database.connector';
import { SQLiteConnector } from './sqlite.connector';
import { populationQueries, datasetQueries } from './population-queries';

@Service()
export class DatabaseService {

  private databaseConnector: IDatabaseConnector;

  constructor() {

    let db: IDatabaseConnector;
    let isTest: boolean = process.env.NODE_ENV.trim() === 'test';

    if (isTest) {
      // Run temporary 'in-memory' database
      db = new SQLiteConnector(':memory:', false);
    } else {
      // Use SQLite file as database
      db = new SQLiteConnector('./countable-database.sqlite', true);
    }

    // Enables foreign keys
    db.executeQuery(QueryType.SELECT, 'PRAGMA foreign_keys = ON;');

    // Create table structure if needed
    let tablePromises: Promise<any>[] = [];
    populationQueries.forEach(function (query) {
      tablePromises.push(db.executeQuery(QueryType.INSERT, query, []));
    });

    // If we are in test mode, then add fake value to the database
    if (isTest) {
      Promise.all(tablePromises).then(() => {
        datasetQueries.forEach(function (query) {
          db.executeQuery(QueryType.INSERT, query, []);
        });
      });
    }

    this.databaseConnector = db;
  }

  /**
   * Executes query with given params and returns rows
   * @param query
   * @param params
   * @returns {Promise<any[]>}
   */
  public select(query: string, ...params: any[]): Promise<any[]> {
    return this.databaseConnector.executeQuery(QueryType.SELECT, query, ...params);
  }

  /**
   * Executes query with given params and returns the unique id of the inserted element
   * @param query
   * @param params
   * @returns {Promise<any[]>}
   */
  public insert(query: string, ...params: any[]): Promise<number> {
    return this.databaseConnector.executeQuery(QueryType.INSERT, query, ...params);
  }

  /**
   * Executes query with given params and returns the number of updated rows
   * @param query
   * @param params
   * @returns {Promise<any[]>}
   */
  public update(query: string, ...params: any[]): Promise<number> {
    return this.databaseConnector.executeQuery(QueryType.UPDATE, query, ...params);
  }

  /**
   * Executes query with given params and returns the number of deleted rows
   * @param query
   * @param params
   * @returns {Promise<any[]>}
   */
  public delete(query: string, ...params: any[]): Promise<number> {
    return this.databaseConnector.executeQuery(QueryType.DELETE, query, ...params);
  }
}
