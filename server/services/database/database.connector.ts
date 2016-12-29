export interface IDatabaseConnector {

  /**
   * Executes given query with given parameters
   * @param query the query to execute
   * @param params the query parameters
   * @returns {Promise<any[]>} rows returned by the query
   */
  executeQuery(query: string, ...params: any[]): Promise<any[]>;
}
