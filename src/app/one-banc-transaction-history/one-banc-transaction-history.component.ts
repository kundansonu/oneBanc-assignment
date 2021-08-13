import { DatePipe } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { TransactionHistoryModel } from '../model/transaction-history.model';
import { TransactionsModel } from '../model/transactions.model';
import { OneBancTransactionHistoryService } from '../services/transaction-history.service';

@Component({
  selector: 'app-one-banc-transaction-history',
  templateUrl: './one-banc-transaction-history.component.html',
  styleUrls: ['./one-banc-transaction-history.component.css'],

})
export class OneBancTransactionHistoryComponent implements OnInit, AfterViewChecked {
  @ViewChild('transactionBody', {
      static: false
  }) private transactionBody: ElementRef;

  transactionHistoryService: OneBancTransactionHistoryService;
  transactionDetails: TransactionHistoryModel;
  transactionReportByDate = new Map < String, TransactionsModel[] > ();

  constructor(@Inject(OneBancTransactionHistoryService) transactionHistoryService: OneBancTransactionHistoryService) {
      this.transactionHistoryService = transactionHistoryService;
  }

  ngOnInit() {
      let datePipe = new DatePipe('en-US');
      this.transactionHistoryService.getTransactionHistory(1, 2).subscribe(result => {
          this.transactionDetails = result;
          this.transactionDetails.transactions.forEach(tr => {
              let newDate = datePipe.transform(tr.startDate, 'dd-MMM-yyyy');
              let transactionArray = this.transactionReportByDate.get(newDate) || [];
              transactionArray.push(tr);

              this.transactionReportByDate.set(newDate, transactionArray)
          })
          console.log(this.transactionReportByDate);
      })
      this.scrollToBottom();
  }
  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.transactionBody.nativeElement.scrollTop = this.transactionBody.nativeElement.scrollHeight;
      } catch (err) {}
  }

  getValue(key) {
      return this.transactionReportByDate.get(key);
  }
  getTransactionStatus(direction, status) {
      let transactionStatus = '';
      if (direction == 1) {
          switch (status) {
              case 1: {
                  transactionStatus = 'You Requested';
                  break;
              }
              case 2: {
                  transactionStatus = 'You Paid';
                  break;
              }
              case 3: {
                  transactionStatus = 'Payment Expired';
                  break;
              }
              case 4: {
                  transactionStatus = 'You Rejected';
                  break;
              }
              case 5: {
                  transactionStatus = 'Canceled';
                  break;
              }
          }
      } else if (direction == 2) {
          switch (status) {
              case 1: {
                  transactionStatus = 'Request Received';
                  break;
              }
              case 2: {
                  transactionStatus = 'You Received';
                  break;
              }
              case 3: {
                  transactionStatus = 'Request Expired';
                  break;
              }
              case 4: {
                  transactionStatus = 'Request Rejected';
                  break;
              }
              case 5: {
                  transactionStatus = 'Canceled';
                  break;
              }
          }
      }
      return transactionStatus;
  }
  getTransactionStatusIcon(status) {
      let statusIcon = '';
      switch (status) {
          case 1: {
              statusIcon = 'pending';
              break;
          }
          case 2: {
              statusIcon = 'confirmed';
              break;
          }
          case 3: {
              statusIcon = 'expired';
              break;
          }
          case 4: {
              statusIcon = 'rejected';
              break;
          }
          case 5: {
              statusIcon = 'canceled';
              break;
          }
      }
      return statusIcon;
  }
}