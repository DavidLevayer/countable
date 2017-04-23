import { Subcategory } from './subcategory';
export class Category {

  id: number;
  name: string;
  subcategories: Subcategory[];
  balance: number;

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}
