import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user";
import { map, retry, catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import { Observable } from "rxjs/internal/Observable";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { ITS_JUST_ANGULAR } from "@angular/core/src/r3_symbols";
@Injectable()
export class AuthService {
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
    headers: new HttpHeaders(),
  };

  login(user: User): Observable<any> {
    if (user.userName !== "" && user.password !== "") {
      const data = {
        Contact_Email: user.userName,
        password: user.password,
      };
      console.log(data);
      return this.http
        .post<any>(this.apiUrl + "/token/authenticate", data)
        .pipe(
          tap(() => this.loggedIn.next(true)),
          retry(1),
          catchError(this.handleError)
        );
    }
  }

  // this.setUpdateCookies(), window.location.reload
  setUpdateCookies() {
    this.httpOptions.headers.set("ACCESS-TOKEN", Cookie.get("data"));
  }
  logout() {
    this.deleteAllCookies();
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }
  deleteAllCookies() {
    // console.log(Cookie.delete('data'))
    Cookie.deleteAll("/", "localhost");
    // console.log(cookie)
    // cookie.forEach(key => {
    //     Cookie.delete(key);
    // });
    // cookie.map(key=>{Cookie.delete(key)})
  }
  handleError(error) {
    let errorMessage = "";
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
