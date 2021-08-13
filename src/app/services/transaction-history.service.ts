import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Inject } from '@angular/core';
import { KeyValuePair } from '../model/keyValuepair';
import { TransactionHistoryModel } from '../model/transaction-history.model';


@Injectable()
export class OneBancTransactionHistoryService {
  http:HttpClient;
   apiUrl = 'https://dev.onebanc.ai/assignment.asmx/';
  constructor(@Inject(HttpClient) http:HttpClient) {
    this.http = http;
   }
  public getTransactionHistory(userId: number, recipientId: number): Observable<TransactionHistoryModel> {
    
    var params : KeyValuePair[] = [];
      params.push({key:'userId',value:userId});
      params.push({key:'recipientId',value:recipientId});
    return this.getRequest<TransactionHistoryModel>(this.getPath('GetTransactionHistory', params));
  }

  public getPath(endpoint: string, args: KeyValuePair[]) {
    let result: string = this.apiUrl;
    result += endpoint;
    result += '?';
    if (args != null && args.length > 0) {
      for (let index = 0; index < args.length; index++) {
        result += args[index].key + '=' + encodeURIComponent(args[index].value.toString());
        if (index < args.length - 1) {
          result += '&';
        }
      }
    }
    return result;
  }


  public getRequest<T>(apiUrl: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(apiUrl, {params: params})
      .pipe(
        //  retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = error.error.message;
      console.error('An error occurred:', errorMessage);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = error.error;
      console.error(`Server Error: ${error.error} ` + `and status code: ${error.status}`);
    }
    if(!errorMessage || typeof errorMessage === 'undefined' || errorMessage === ''){
      errorMessage = 'Something bad happened, please try again after sometime.';
    }
    // return an observable with a user-facing error message
    return throwError(errorMessage);
  }


}
