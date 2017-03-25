import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AccountComponent } from '../account/account.component';
import { CategoryComponent } from '../category/category.component';

const routes: Routes = [
  { component: HomeComponent, path: 'home' },
  { component: AccountComponent, path: 'account' },
  { component: CategoryComponent, path: 'category' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
}
