import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { HomeComponent } from '../home/home.component';
import { AccountComponent } from '../account/account.component';
import { AccountService } from '../account/account.service';
import { CategoryService } from '../category/category.service';
import { CategoryComponent } from '../category/category.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { TransactionService } from '../transaction/transaction.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    CategoryComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NKDatetimeModule,
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [
    AccountService,
    CategoryService,
    TransactionService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
