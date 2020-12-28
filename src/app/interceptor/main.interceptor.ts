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

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  [x: string]: any;

  constructor(private service: ServicesService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.service.getToken();
    const userDevice = this.service.userDevice();
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    if (token) {
      headersConfig['ACCESS-TOKEN'] = `${token}`;
    }
    if (userDevice) {
      headersConfig['user-device'] = `${userDevice}`;
    }
    headersConfig['version-code'] = `1.0.0.001a`;
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
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                this.errorDialogService.openDialog(data);
                return throwError(error);
            }));
  }
}
