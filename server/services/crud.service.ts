export interface CrudService {

  /**
   * Gets object with given identifier
   * @param objectId
   */
  get(objectId: number): Promise<any>;

  /**
   * Gets all object
   */
  getAll(): Promise<any[]>;

  /**
   * Adds given object to database
   * @param object
   */
  create(object: any): Promise<any>;

  /**
   * Updates given object
   * @param object
   */
  update(object: any): Promise<any>;

  /**
   * Delete given object
   * @param object
   */
  delete(object: any): Promise<boolean>;
}
