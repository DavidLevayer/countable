export class DatabaseServiceMock {

  public toReturn: any;
  public shouldFail = false;
  public failMessage: string;

  public select(query: string, ...params: any[]) {
    return this.mockQuery();
  }

  public insert(query: string, ...params: any[]) {
    return this.mockQuery();
  }

  private mockQuery(): Promise<any[]> {
    if (this.shouldFail) {
      return Promise.reject(this.failMessage);
    }
    return Promise.resolve(this.toReturn);
  }
}
