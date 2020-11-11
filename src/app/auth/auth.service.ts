import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
import {map, retry, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';
@Injectable()
export class AuthService {
    private apiUrl =environment.dummyApi;
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    
    constructor(
        private router: Router,private http: HttpClient
    ) { }
     
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': '*',
            'Access-Control-Allow-Headers':'*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'*'
        })
      };
  
    login(user: User) : Observable<any>{
        if (user.userName !== '' && user.password !== '') {
            const data ={
                Contact_Email: user.userName,
                password: user.password 
            }
            console.log(data); 
            return this.http.post<any>(this.apiUrl+"/token/authenticate",data,this.httpOptions)
            .pipe( 
                tap(()=>{                    
                    // this.loggedIn.next(true);
                    this.router.navigate(['/']);
                }),
                retry(1),catchError(this.handleError));           
        }
        
    }

    logout() {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
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