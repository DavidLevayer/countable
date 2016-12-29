import { Database, Statement } from 'sqlite3';
import { IDatabaseConnector } from './database.connector';

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

    let promise: Promise<Statement> = this.prepare(query);

    if (this.debug) {
      console.info('\nRunning query: ' + query);
      console.info('With params: ' + params);
    }

    return promise.then((statement: Statement) => {
      return this.all(statement, params);
    });
  }

  /**
   * Prepares the SQL statement
   * @param query the query to prepare
   * @returns {Promise<Statement>} the query Statement object
   */
  private prepare(query: string): Promise<Statement> {
    return new Promise((resolve, reject) => {
      const statement = this.db.prepare(query, (err) => {
        if (err) {
          if (this.debug) {
            console.info('Error: cannot prepare query: ' + err);
          }
          reject(err);
        } else {
          resolve(statement);
        }
      });
    });
  }

  /**
   * Runs the SQL query with the specified parameters and returns all result rows afterwards.
   * @param statement
   * @param params
   * @returns {Promise<T>}
   */
  private all(statement: Statement, params?: any[]): Promise<any[]> {

    return new Promise((resolve, reject) => {
      statement.all(params, function (err, rows) {
        if (err) {
          if (this.debug) {
            console.info('Error: cannot execute query: ' + err);
          }
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
