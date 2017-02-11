import { Database } from 'sqlite3';
import { IDatabaseConnector, QueryType } from './database.connector';

export class SQLiteConnector implements IDatabaseConnector {

  /** SQLite database object */
  private db: Database;

  /**
   * Basic constructor
   * @param databaseFilename the database SQLite file name
   * @param debug True if query information should be displayed, false otherwise
   */
  constructor(private databaseFilename: string, private debug: boolean) {
    const sqlite = require('sqlite3').verbose();
    this.db = new sqlite.Database(databaseFilename);
  }

  /**
   * Executes given query with given parameters
   * @param queryType the query type, i.e. select, insert, etc.
   * @param query the query to execute
   * @param params the query parameters
   * @returns {Promise<any[]>} rows returned by the query
   */
  public executeQuery(queryType: QueryType, query: string, ...params: any[]): Promise<any[]> {

    if (this.debug) {
      /* tslint:disable:no-console */
      console.info('\nRunning query: ' + query);
      console.info('With params: ' + params);
      /* tslint:enable:no-console */
    }

    return new Promise((resolve, reject) => {

      switch (queryType) {
        case QueryType.SELECT:
          this.db.all(query, params, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
          break;
        case QueryType.INSERT:
          this.db.run(query, params, function (err) {
            // Do not use arrow function so we can access 'this'
            // See https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback
            if (err) {
              reject(err);
            } else {
              resolve(this.lastID);
            }
          });
          break;
        case QueryType.UPDATE:
        case QueryType.DELETE:
          this.db.run(query, params, function (err) {
            // Do not use arrow function so we can access 'this'
            // See https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback
            if (err) {
              reject(err);
            } else {
              resolve(this.changes);
            }
          });
          break;

      }
    });
  }
}
