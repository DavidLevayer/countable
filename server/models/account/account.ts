import { JsonProperty } from 'ts-express-decorators';

export class Account {
  @JsonProperty()
  id: number;
  @JsonProperty()
  name: string;
}
