import { Database } from 'sqlite3';
import { IDatabaseConnector } from './database.connector';

/* tslint:disable:no-console */
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
   * @param query the query to execute
   * @param params the query parameters
   * @returns {Promise<any[]>} rows returned by the query
   */
  public executeQuery(query: string, ...params: any[]): Promise<any[]> {

    if (this.debug) {
      console.info('\nRunning query: ' + query);
      console.info('With params: ' + params);
    }

    return new Promise((resolve, reject) => {
      this.db.all(query, params, function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
/* tslint:enable:no-console */
