
export class DatabaseServiceMock {

  public toReturn: any;
  public shouldFail: boolean = false;
  public failMessage: string;

  public executeQuery(query: string, ...params: any[]): Promise<any[]> {
    if (this.shouldFail) {
      return Promise.reject(this.failMessage);
    }
    return Promise.resolve(this.toReturn);
  }
}
