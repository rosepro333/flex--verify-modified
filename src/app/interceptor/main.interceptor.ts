import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicesService } from '../service/services.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { error } from '@angular/compiler/src/util';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  [x: string]: any;

  constructor(private service: ServicesService, private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url =environment.apiUrl;
    const token = this.service.getToken();
    const userDevice = this.service.userDevice();
    const forgetUserId = this.service.forgetUserId();
    const resetUserId = this.service.resetUserId();
    const getSdkKey = this.service.getSdkKey();
    const docForRegenerateUrl = this.service.docForRegenerateUrl();
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    if(request.url === `${url}/user/setForgetPassword`){
      headersConfig['user-access-token'] = `${forgetUserId}`;
    }else{
      Cookie.delete('data_ID')
    }
    if(request.url === `${url}/user/resetPassword`){
      headersConfig['user-access-token'] = `${resetUserId}`;
    }else{
      Cookie.delete('data_ID')
    }
    if(request.url === `${url}/generate/regenerateURl`){
      console.log('hit')
      headersConfig['document-access-id'] = `${docForRegenerateUrl}`;
    }else{
      Cookie.delete('data_ID')
    }
    if(request.url === `${url}/generate`){
      headersConfig['x-access-token'] = `${getSdkKey}`;
    }else{
      Cookie.delete('sdkKey')
    }
    if (token) {
      headersConfig['ACCESS-TOKEN'] = `${token}`;
    }
    if (userDevice) {
      headersConfig['user-device'] = `${userDevice}`;
    }
    headersConfig['version-code'] = `1.0.0.001a`;
    // headersConfig['Access-Control-Allow-Origin'] = `firebasestorage.googleapis.com`;
    request = request.clone({
      setHeaders: headersConfig
    });
    // headersConfig['user-device'] = `${userDevice}`;
  request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                console.log(error);
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                  };
                this.errorDialogService.openDialog(data);
                return throwError(error);
            }));
  }
}
