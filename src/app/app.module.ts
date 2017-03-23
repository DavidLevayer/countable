import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '../home/home.component';
import { AccountComponent } from '../account/account.component';
import { AccountService } from '../account/account.service';
import { CategoryService } from '../category/category.service';
import { CategoryComponent } from '../category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AccountService,
    CategoryService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
