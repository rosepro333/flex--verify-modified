import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
import {map, retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
@Injectable()
export class AuthService {
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
  
    login(user: User) {
        if (user.userName !== '' && user.password !== '') {
            const data ={
                Contact_Email: user.userName,
                password: user.password 
            }
            return this.http.post(this.apiUrl+"token/authenticate",data,{headers:this.headers})
            .pipe(
                map((response: Response) => {
                console.log(response)
                this.loggedIn.next(true);
                this.router.navigate(['/']);
                return response;
              })
              ,retry(1),
              catchError(this.handleError)
            );
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