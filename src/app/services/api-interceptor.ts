import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NG_AUTH_TOKEN } from 'app/common/ng-constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthenticatedHttpService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
        const headers = new HttpHeaders({
          'Authorization': localStorage.getItem('token'),
          'deviceType': 'Computer',
          'platform': 'Web'
        });
        const clonedRequest = req.clone({ headers });
        return next.handle(clonedRequest).do(event => { }, err => {
          if (err instanceof HttpErrorResponse && (err.status == 401 || err.status == 403)) {
            window.localStorage.clear();
            this.router.navigate(['/login']);
          }
        });
      }
    return next.handle(req);
  }
}
