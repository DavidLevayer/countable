export enum QueryType {
  SELECT,
  INSERT,
  UPDATE,
  DELETE
}

export interface IDatabaseConnector {

  /**
   * Executes given query with given parameters
   * @param query the query to execute
   * @param params the query parameters
   * @returns {Promise<any[]>} rows returned by the query
   */
  executeQuery(queryType: QueryType, query: string, ...params: any[]): Promise<any[]>;
}
