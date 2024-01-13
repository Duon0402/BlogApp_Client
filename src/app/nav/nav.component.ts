import { Component } from '@angular/core';
import { LoginDto, ServiceProxies, UserDto } from '../../shared/proxies-sevices/proxies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  loginData: LoginDto = {
    userName: '',
    password: ''
  }

  constructor(private _service: ServiceProxies, private toastr: ToastrService) {}

  login() {
    this._service.login(this.loginData).subscribe(
        (user: UserDto) => {
          this.toastr.success('Login successful', 'Success');
        },
        (error) => {
          this.toastr.error('Login failed. Please check your credentials.', 'Error');
        }
      );
  }
}
