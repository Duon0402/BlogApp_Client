import { User } from './../../shared/proxies-sevices/proxies.service';
import { Injectable } from '@angular/core';
import {
  ServiceProxies,
  UserDto,
} from '../../shared/proxies-sevices/proxies.service';
import { ReplaySubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new ReplaySubject<UserDto | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private _service: ServiceProxies,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(model: any) {
    return this._service.login(model).subscribe(
      (user: UserDto) => {
        this.toastr.success('Login Successful');
        this.setCurrentUser(user);
        this.router.navigateByUrl('/list');
      },
      (error) => {
        this.toastr.error('Login Failed');
      }
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: UserDto) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getCurrentUserId(): string | undefined {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user: UserDto = JSON.parse(storedUser);
      return user.userID;
    }

    return undefined;
  }
}
