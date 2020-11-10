// import { HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/internal/Observable';
// import { throwError } from 'rxjs/internal/observable/throwError';
// import { catchError } from 'rxjs/internal/operators/catchError';
// import { retry } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class ServicesService {

//   constructor() { }
//   httpOptions = {
//     headers: new HttpHeaders({}),
//   };
//   public login(data: any): Observable<any> {
//     const form = new FormData();
//     const loginData =
//       '[{"employeePassword": "' +
//       data.employeePassword +
//       '", "employeeMobile": "' +
//       data.employeeMobile +
//       '","languageID": "' +
//       data.languageID +
//       '", "employeeDeviceID": "token", "apiType": "Android", "apiVersion": "1.0"}]';
//     form.append('json', loginData);
//     return this.http
//       .post<>(this.loginUrl, form, this.httpOptions)
//       .pipe(retry(3), catchError(this.handleError));
//   }

//   // ErrorHandling
//   public handleError(error: any) {
//     let errorMessage = '';
//     if (error.error instanceof ErrorEvent) {
//       // Get Client Side Error
//       errorMessage = error.error.messages;
//     } else {
//       // Get Server-Side Error
//       errorMessage = `Error Code : ${error.status}\nMessage : ${error.messsage}`;
//     }
//     // window.alert(errorMessage);
//     return throwError(errorMessage);
//   }
// }
