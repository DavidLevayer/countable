import { JsonProperty } from 'ts-express-decorators';

export class Subcategory {
  @JsonProperty()
  id: number;
  @JsonProperty()
  name: string;

  constructor(id?: number, name?: string){
    this.id = id;
    this.name = name;
  }
}
