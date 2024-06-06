import { Component } from '@angular/core';

import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  MessageError!:string
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}


  login() {
    console.log('Login function called');
    console.log('Sending credentials:', this.credentials);
    this.authService.login(this.credentials)
      .subscribe({
          next: (data) => {
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            this.router.navigate(['/']);

        },
        error: (err) => {
        this.MessageError= err;
        }
      });
  }

}

