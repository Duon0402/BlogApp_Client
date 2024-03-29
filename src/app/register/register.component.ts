import { AccountService } from './../_services/account.service';
import { Component } from '@angular/core';
import {
  RegisterDto,
  ServiceProxies,
  UserDto,
} from '../../shared/proxies-sevices/proxies.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerDto: RegisterDto = {
    userName: '',
    fullName: '',
    password: '',
  };
  rePassword!: string;

  constructor(
    private _service: ServiceProxies,
    private toastr: ToastrService,
    private router: Router,
    private accountService: AccountService
  ) {}

  register() {
    this._service.register(this.registerDto).subscribe(
      (user: UserDto) => {
        this.toastr.success('Register successful', 'Success');
        this.accountService.setCurrentUser(user);
        this.router.navigateByUrl('/list');
      },
      (error) => {
        this.toastr.error('Register failed.', 'Error');
      }
    );
  }
}
