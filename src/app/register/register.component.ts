import { Component } from '@angular/core';
import {
  RegisterDto,
  ServiceProxies,
  UserDto,
} from '../../shared/proxies-sevices/proxies.service';

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
  userDto: UserDto | null = null;

  constructor(private _service: ServiceProxies) {}

  register() {
    this._service.register(this.registerDto).subscribe(
      (data: UserDto) => {
        this.userDto = data;
      },
      (error) => {
        console.error('Error during registration:', error);
      }
    );
  }
}
