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
  constructor(private http: HttpClient) {
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
  setDocumentForAllCountry(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/documentConfig/setHeaderForAllCountry/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  toggleConfiguteForCountry(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/documentConfig/toggleConfiguteForCountry/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  selectTenentConfig(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/documentConfig/configAllCountryAndDocument/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  webhookUpdate(id: any, data: any): Observable<any> {
    return this.http.put(this.apiUrl + '/webhook/' + id, data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  webhookList(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/webhook/list/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  createWebhook(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/webhook/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  countryListData(): Observable<any> {
    return this.http.post(this.apiUrl + '/country/countryList/', {}, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  docTypeListForHeader(): Observable<any> {
    return this.http.get(this.apiUrl + '/documentType/docTypelist/', this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  documentTypeUpdate(id: any, data: any): Observable<any> {
    return this.http.put(this.apiUrl + '/documentType/' + id, data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  documentTypeList(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/documentType/list/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  createDocumentType(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/documentType/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  countryList(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/country/list', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  countryUpdate(id: any, data: any): Observable<any> {
    return this.http.put(this.apiUrl + '/country/' + id, data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  createCountry(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/country/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  reGenerateUrl(): Observable<any> {
    return this.http.post(this.apiUrl + '/generate/regenerateURl', {}, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  sentEmailToUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/email', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  resendInvitation(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/user/resendInvitation', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  emaiListFilter(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/email/list', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  reportVerification(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/dashboard/verification', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  emailConfiguration(id: any, data: any): Observable<any> {
    return this.http.patch(this.apiUrl + '/tenent/emailConfiguation/' + id, data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  getEmailConfiguration(id: any): Observable<any> {
    return this.http.get(this.apiUrl + '/tenent/emailConfiguation/' + id, this.httpOptions).pipe(retry(1), catchError(this.handleError));
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
