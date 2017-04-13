import { JsonProperty } from 'ts-express-decorators';

export class Account {
  @JsonProperty()
  id: number;
  @JsonProperty()
  name: string;

  balance: number;

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}
