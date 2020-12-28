import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
   private apiUrl = environment.apiUrl;
  constructor( private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders()
  };
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
