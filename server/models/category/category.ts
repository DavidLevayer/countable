import { JsonProperty } from 'ts-express-decorators';
import { Subcategory } from './subcategory';

export class Category {
  @JsonProperty()
  id: number;
  @JsonProperty()
  name: string;
  @JsonProperty()
  subcategories: Subcategory[] = [];

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}
