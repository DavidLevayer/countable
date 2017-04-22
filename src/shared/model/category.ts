import { Subcategory } from './subcategory';
export class Category {

  id: number;
  name: string;
  subcategories: Subcategory[];

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}
