import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { environment } from 'src/environments/environment';
import {map, retry, catchError } from 'rxjs/operators';
import {TenentUser} from './tenent';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
    private apiUrl =environment.apiUrl;
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    
    constructor(
        private router: Router,private http: HttpClient
    ) { }
    headers= new HttpHeaders({
        'Content-Type': '*',
        'Access-Control-Allow-Headers':'*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods':'*'
    })  
    createTenant(tanent: TenentUser) {
        if (tanent.email !== '' && tanent.name !== '' && tanent.tenent !== '') {
            const data ={
                Contact_Name: tanent.name,
                Contact_Mail: tanent.email,
                Name:tanent.tenent
            }
            return this.http.post(this.apiUrl+"tenent",data,{headers:this.headers})
            .pipe(
                map((response: Response) => {
                console.log(response);             
                return response;
              })
              ,retry(1),
              catchError(this.handleError)
            );
        }
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
