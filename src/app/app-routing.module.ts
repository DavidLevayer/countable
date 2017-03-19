import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AccountComponent } from '../account/account.component';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: AccountComponent, path: 'account' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
}
