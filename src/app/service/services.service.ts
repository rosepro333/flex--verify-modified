import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { environment } from 'src/environments/environment';
import { map, retry, catchError } from 'rxjs/operators';
import { TenentUser } from './tenent';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { async } from 'rxjs/internal/scheduler/async';
@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  // private apiUrl = environment.dummyApi;
  private apiUrl = environment.apiUrl;
  updateNav: string;
  update: BehaviorSubject<string>;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  // tslint:disable-next-line:typedef
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) {
    this.update = new BehaviorSubject(this.updateNav);
  }
  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
  };
  // const httpOptions =  new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  userDrawer = (updateString: string) => {
    console.log(updateString)
    this.update.next('ddsdscdscdsc');
    // this.update.next(updateString);
  }
  getToken = () => {
    return Cookie.get('data');
  }
  userDevice = () => {
    return Cookie.get('user-device');
  }
  forgetUserId = () =>{
    return Cookie.get('data_ID')
  }
  resetUserId = () =>{
    return Cookie.get('reset_ID')
  }
  getSdkKey = () =>{
    return Cookie.get('sdkKey')
  }
  docForRegenerateUrl = () =>{
    return Cookie.get('docForRegenerateUrl')
  }
  updateUser(id:string,data: any): Observable<any> {
    return this.http.patch(this.apiUrl + '/user/update/'+ id, data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  updateTenent(id:string,data: any): Observable<any> {
    return this.http.patch(this.apiUrl + '/tenent/update/'+ id, data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  userForChangePassword(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/user/accessToken', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  sendEmail(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/email/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  audit(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/audit/', data, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  userDetails(): Observable<any> {
    return this.http.get(this.apiUrl + '/user/userInfo', this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }
  createTenent(data: any): Observable<any> {
      return this.http
        .post(this.apiUrl + '/tenent', data, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));

  }
  deleteTenent(id: any): Observable<any> {
    return this.http
      .delete(this.apiUrl + '/tenent/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  blockTenent(id: any,data: any): Observable<any> {
    return this.http
      .patch(this.apiUrl + '/tenent/blockTenent/' + id,data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  userCreate(data: any): Observable<any> {
      return this.http
        .post(this.apiUrl + '/user', data, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));

  }
  createSdkKey(data: any): Observable<any> {
    if (data.Tenent !== '' && data.mode !== '') {
      const sdkData = {
        Tenent_ID: data.Tenent,
        Mode: data.mode,
      };
      return this.http
        .post(this.apiUrl + '/sdkkey', sdkData, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
    }
  }
  getSdkKeyListById(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/sdkkey/list/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getSdkKeyList(data: any): Observable<any> {
    return this.http
      .post(this.apiUrl + '/sdkkey/list',data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteSdyKey(id: any): Observable<any> {
    return this.http
      .delete(this.apiUrl + '/sdkkey/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  createApiKey(data: any): Observable<any> {
      return this.http
        .post(this.apiUrl + '/apikey', data, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
  }
  getApiKeyListById(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/apikey/list/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getApiKeyList(data: any): Observable<any> {
    return this.http
      .post(this.apiUrl + '/apikey/list',data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteApiKey(id: any): Observable<any> {
    return this.http
      .delete(this.apiUrl + '/apikey/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getTenentList(data: any): Observable<any> {
    return this.http
      .post(this.apiUrl + '/tenent/list',data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getUserList(data: any): Observable<any> {
    return this.http
      .post(this.apiUrl + '/user/list', data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getUserDetails(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/user/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  scanResults(id:any,data: any): Observable<any> {
    return this.http
      .put(this.apiUrl + '/scans/scanResult/' + id,data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteScan(id: any): Observable<any> {
    return this.http
      .delete(this.apiUrl + '/scans/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteUser(id: any): Observable<any> {
    return this.http
      .delete(this.apiUrl + '/user/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  blockUser(id: any, data: any): Observable<any> {
    return this.http
      .patch(this.apiUrl + '/user/blockUser/' + id,data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  findUserById(id: any): Observable<any> {
    if (id) {
      const formData = {
        id,
      };
      console.log(id);
      return this.http
        .post(
          this.apiUrl + '/user/findTenedByUserId',
          formData,
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }
  }
  findUserByTenentId(id: any): Observable<any> {
    if (id) {
      const formData = {
        id,
      };
      console.log(id);
      return this.http
        .post(
          this.apiUrl + '/user/findUserByTenentId',
          formData,
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }
  }
  resetPassword(data: any): Observable<any> {
    Cookie.set('reset_ID',data.id);
      return this.http
        .post(this.apiUrl + '/user/resetPassword', data, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));

  }
  idFindMyMail(data: any): Observable<any> {
    if (data) {
      const formData = {
        Contact_Email: data.userName,
      };
      return this.http
        .post(this.apiUrl + '/user/idFindByEmail', formData, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
    }
  }

  forgetPassword(data: any): Observable<any> {
    console.log();
    if (data) {
      const formData = {
        email: data.userName,
      };
      return this.http
        .post(this.apiUrl + '/user/forgetPassword', formData, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
    }
  }

  setForgetPassword(data: any): Observable<any> {
    // headers.append('user-access-token',data.id);
    // this.httpOptions.headers.append('user-access-token',data.id)
    Cookie.set('data_ID',data.id);
    if (data) {
      const formData = {
        // id: data.id,
        password: data.password,
      };
      return this.http
        .post(
          this.apiUrl + '/user/setForgetPassword',
          formData,
          this.httpOptions
        )
        .pipe(retry(1),map(()=>{}), catchError(this.handleError));
    }
  }
  // tslint:disable-next-line:variable-name
  getTenentSdkList(tenent_id: any): Observable<any> {
    console.log(tenent_id);
    return this.http
      .get(this.apiUrl + '/sdkkey/list/' + tenent_id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  findTenetListById(id: any): Observable<any> {
    if (id) {
      const formData = {
        id,
      };
      console.log(id);
      return this.http
        .post(
          this.apiUrl + '/tenent/findTenedByUserId',
          formData,
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }
  }
  findTenetListByTenentID(id: any): Observable<any> {
    if (id) {
      const formData = {
        Tenant_ID: id,
      };
      console.log(id);
      return this.http
        .post(
          this.apiUrl + '/tenent/findTenedByTenentId',
          formData,
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }
  }
  generateUrl(key: any): Observable<any> {
    console.log(key);
    // const data = {
    //   header: key,
    // };
    Cookie.set('sdkKey',key)
    return this.http
      .post(this.apiUrl + '/generate', {}, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  documentList(): Observable<any> {
    return this.http
      .get(this.apiUrl + '/document/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getScanDocumentById(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/scans/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getDocumentBy(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/document/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  scanDocList(): Observable<any> {
    return this.http
      .post(this.apiUrl + '/scans/docsScanList', {}, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  scanDocByTenent(data: any): Observable<any> {
    return this.http
      .post(this.apiUrl + '/scans/scanDocByTenent', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  scanDocByAdmin(data: any): Observable<any> {
    return this.http
      .post(this.apiUrl + '/scans/scanDocByAdmin', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  approvedScanDocument(id: any, data: any): Observable<any> {
    return this.http
      .put(
        this.apiUrl + '/scans/updateScanDocument/' + id,
        data,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  getAllComment(data: any): Observable<any> {
    return this.http
      .post(
        this.apiUrl + '/comments/list',
        data,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  userComment(data: any): Observable<any> {
    return this.http
      .post(
        this.apiUrl + '/comments',
        data,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  geScanDocumentList(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/scans/allScanByDocumentId/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  // handleError = (error: any) => {
  //   return error;
  // //   let errorMessage = '';
  // //   if (error.error instanceof ErrorEvent) {
  // //     // Get Client Side Error
  // //     errorMessage = error.error.messages;
  // //   } else {
  // //     // Get Server-Side Error
  // //     errorMessage = `Error Code : ${error.status}\nMessage : ${error.messsage}`;
  // //   }
  // //   // window.alert(errorMessage);
  // //   return throwError(errorMessage);
  // }
}
