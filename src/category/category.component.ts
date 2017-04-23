import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/model/category';
import { CategoryService } from './category.service';
import { Subcategory } from '../shared/model/subcategory';
import { Error } from '../shared/error';

@Component({
  selector: 'app-category',
  templateUrl: 'category.component.html',
  styleUrls: [
    '../shared/scss/card.common.scss',
    '../shared/scss/highlight.common.scss',
    '../shared/scss/callout.common.scss'
  ]
})
export class CategoryComponent implements OnInit {

  /** List of categories */
  categories: Category[] = [];
  /** Name of the to-be-created category */
  categoryName = '';
  /** Name of the to-be-created subcategory */
  subcategoryName = '';
  /** Id of the category we are currently editing */
  editingCategoryId = 0;
  /** Contains an eventual error */
  error: Error;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      res => this.categories = res,
      err => this.error = err
    );
  }

  create(): void {
    if (this.categoryName.length > 0) {
      let category: Category = new Category();
      category.name = this.categoryName;
      this.categoryService.create(category).subscribe(res => {
          if (res.length === 1) {
            this.categories.push(res[ 0 ]);
          }
          this.categoryName = '';
          this.error = null;
        },
        err => this.error = err
      );
    }
  }

  update(category: Category): void {
    if (this.editingCategoryId >= 0) {
      this.categoryService.update(category).subscribe(() => {
          this.editingCategoryId = 0;
          this.error = null;
        },
        err => this.error = err
      );
    }
  }

  delete(id: number): void {
    this.categoryService.delete(id).subscribe(res => {
        if (res) {
          this.categories = this.categories.filter((category) => category.id !== id);
          this.error = null;
        } else {
          this.error = new Error('Cannot delete category #' + id + ': server returns failure status.');
        }
      },
      err => this.error = err
    );
  }

  toggleEdit(id: number): void {
    this.editingCategoryId = id;
  }

  addSubcategory(category: Category): void {
    if (this.subcategoryName.length > 0) {
      let subcategory: Subcategory = new Subcategory();
      subcategory.name = this.subcategoryName;

      category.subcategories.push(subcategory);
      this.subcategoryName = '';
    }
  }

  removeSubcategory(category: Category, subcategory: Subcategory): void {

    category.subcategories = category.subcategories.filter((sc) => {
      return sc.name !== subcategory.name;
    });
  }
}
