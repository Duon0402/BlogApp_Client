import { Component, OnInit } from '@angular/core';
import { LoginDto } from '../../shared/proxies-sevices/proxies.service';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  loginData: LoginDto = {
    userName: '',
    password: '',
  };

  constructor(
    public _service: AccountService,
  ) {}
  ngOnInit(): void {}

  login() {
    this._service.login(this.loginData);
  }

  logout() {
    this._service.logout();
    this.loginData.password = '';
    this.loginData.userName = '';
  }
}
