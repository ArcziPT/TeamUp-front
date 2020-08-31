import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserSessionManagerService} from '../services/user-session-manager.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private sessionManager: UserSessionManagerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.sessionManager.signed){
      request = request.clone({setHeaders: {Authorization: `Bearer ${this.sessionManager.token}`}});
    }

    return next.handle(request);
  }
}
