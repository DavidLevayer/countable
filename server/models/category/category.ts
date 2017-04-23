import { JsonProperty } from 'ts-express-decorators';
import { Subcategory } from './subcategory';

export class Category {
  @JsonProperty()
  id: number;
  @JsonProperty()
  name: string;
  @JsonProperty({use: Subcategory})
  subcategories: Subcategory[] = [];

  balance: number;

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}
