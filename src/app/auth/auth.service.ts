import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
import * as CryptoJS from 'crypto-js';
// import { AES } from 'crypto-js/aes';
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
                "contact_Email": "admin@flexm.com",
                "password": "admin1234" 
            }
            // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key asdaddadcdcwdasqwdcsdffdcsadxass').toString();
            return this.http.post(this.apiUrl+"token/authenticate",data,{headers: this.headers}).subscribe((result)=>{
                console.log(result);  
            })
            // this.loggedIn.next(true);
            // this.router.navigate(['/']);  
        }
    }

    logout() {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }
}