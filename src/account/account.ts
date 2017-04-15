export class Account {

  id: number;
  name: string;
  balance: number;

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}
