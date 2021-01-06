import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  updatePrint: any;
  filterData: any;
  filter: BehaviorSubject<any>;
  printData: BehaviorSubject<any>;
  // currentMessage = this.printData.asObservable();
   private apiUrl = environment.apiUrl;
  constructor( private http: HttpClient) {
    this.printData = new BehaviorSubject(this.updatePrint);
    this.filter = new BehaviorSubject(this.filterData);
  }
  httpOptions = {
    headers: new HttpHeaders()
  };
  filterFunction = (data: any) => {
    this.filter.next(data);
  }
  printAbleData(data: any) {
    console.log(data);
    this.printData.next(data)
  }
  reportVerification(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/dashboard/verification', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  emailConfiguration(id: any,data: any): Observable<any> {
    return this.http.patch(this.apiUrl + '/tenent/emailConfiguation/'+ id, data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  mobileActivity(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/userAppLog/list/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  portalActivity(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/audit/list/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  scanReport(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/scans/scanReport/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  // tslint:disable-next-line:typedef
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
