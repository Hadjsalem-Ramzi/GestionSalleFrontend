import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  MessageError!:string;
  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next:(data)=>{
        console.log(data);
        this.router.navigate(['/login']);
      },
      error:(err)=>{
        this.MessageError=err;
      }
    })



  }
}
