import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OneBancTransactionHistoryComponent } from './one-banc-transaction-history/one-banc-transaction-history.component';
import { OneBancTransactionHistoryService } from './services/transaction-history.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpClientModule ],
  declarations: [ AppComponent, OneBancTransactionHistoryComponent ],
  providers: [
    OneBancTransactionHistoryService],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }
