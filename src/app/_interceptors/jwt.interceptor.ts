import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { UserDto } from '../../shared/proxies-sevices/proxies.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: UserDto | null;

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    if(currentUser!) {
      request  = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
         }
      });

    }

    return next.handle(request);
  }
}
