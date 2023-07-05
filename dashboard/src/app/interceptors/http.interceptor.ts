import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../service/app.service';

@Injectable()
export class ICOInterceptor implements HttpInterceptor {

  constructor(private _app: AppService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headersConfig = {
      Accept: "application/json",
      Authorization: '',
    };

    const token = this._app.getCookiesByName('token');
    if(request.url.indexOf('login') > 0 || request.url.indexOf('register') > 0){

    }
    else{
      headersConfig['Authorization'] = token;
    }
    
    request = request.clone({
      setHeaders: headersConfig,
    });
    return next.handle(request);

  }
}
