import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AccountComponent } from '../account/account.component';
import { CategoryComponent } from '../category/category.component';
import { TransactionComponent } from '../transaction/transaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { component: HomeComponent, path: 'home' },
  { component: AccountComponent, path: 'account' },
  { component: CategoryComponent, path: 'category' },
  { component: TransactionComponent, path: 'transaction' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
})
export class AppRoutingModule {
}
