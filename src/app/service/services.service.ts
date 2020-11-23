import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
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
  private apiUrl = environment.dummyApi;
  // private apiUrl = environment.apiUrl;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders()
      .set('ACCESS-TOKEN', Cookie.get('data'))
      .set('x-access-token', Cookie.get('x-access-token')),
  };
  createTenent(tanent: TenentUser): Observable<any> {
    if (tanent.email !== '' && tanent.name !== '' && tanent.tenent !== '') {
      const data = {
        Contact_Name: tanent.name,
        Contact_Mail: tanent.email,
        Name: tanent.tenent,
      };
      return this.http
        .post(this.apiUrl + '/tenent', data, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
    }
  }
  deleteTenent(id: any): Observable<any> {
    return this.http
      .delete(this.apiUrl + '/tenent/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  blockTenent(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/tenent/blockTenent/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  userCreate(user: any): Observable<any> {
    if (user.email !== '' && user.name !== '' && user.access !== '') {
      const data = {
        Contact_Email: user.email,
        Contact_Name: user.name,
        Access_Type: user.access,
        Tenant_ID: user.tenent,
      };
      return this.http
        .post(this.apiUrl + '/user', data, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
    }
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
  getSdkKeyList(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/sdkkey/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  createApiKey(data: any): Observable<any> {
    if (data.Tenent !== '' && data.mode !== '') {
      const apiKeyData = {
        Tenent_ID: data.Tenent,
        Mode: data.mode,
      };
      console.log();
      return this.http
        .post(this.apiUrl + '/apikey', apiKeyData, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
    }
  }
  getApiKeyListById(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/apikey/list/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getApiKeyList(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/apikey/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getTenentList(): Observable<any> {
    return this.http
      .get(this.apiUrl + '/tenent/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getUserList(): Observable<any> {
    return this.http
      .get(this.apiUrl + '/user/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getUserDetails(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/user/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteUser(id: any): Observable<any> {
    return this.http
      .delete(this.apiUrl + '/user/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  blockUser(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/user/blockUser/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  findUserById(id: any): Observable<any> {
    if (id) {
      const formData = {
        id: id,
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
  resetPassword(data: any): Observable<any> {
    console.log(data);
    if (data) {
      const resetDAta = {
        id: data.id,
        password: data.currentPassword,
        newpassword: data.newPassword,
      };
      console.log(resetDAta);
      return this.http
        .post(this.apiUrl + '/user/resetPassword', resetDAta, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
    }
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
    console.log();
    if (data) {
      const formData = {
        id: data.id,
        password: data.password,
      };
      return this.http
        .post(
          this.apiUrl + '/user/setForgetPassword',
          formData,
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }
  }
  getTenentSdkList(tenent_id: any): Observable<any> {
    console.log(tenent_id);
    return this.http
      .get(this.apiUrl + '/sdkkey/list/' + tenent_id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  findTenetListById(id: any): Observable<any> {
    if (id) {
      const formData = {
        id: id,
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
  generateUrl(key: any): Observable<any> {
    console.log(key);
    const data = {
      header: key,
    };
    return this.http
      .post(this.apiUrl + '/generate', data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  documentList(): Observable<any> {
    return this.http
      .get(this.apiUrl + '/document/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getScanDocumentById(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/scans' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getDocumentBy(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/document/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  geScanDocumentList(id: any): Observable<any> {
    return this.http
      .get(this.apiUrl + '/scans/scanIdByDocument/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get Client Side Error
      errorMessage = error.error.messages;
    } else {
      // Get Server-Side Error
      errorMessage = `Error Code : ${error.status}\nMessage : ${error.messsage}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
