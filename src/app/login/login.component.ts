import { AuthService } from './../services/auth.service';
import { NG_AUTH_TOKEN, ROUTES_PATH } from '../common/ng-constants';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface LoginUser {
  username?: string;
  password?: string;
}
export interface LoginResponse {
  success: boolean,
  message: string,
  token: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  model: LoginUser = {};
  errorMessage: string = '';


  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 200,
        },
        color: {
          value: '#ff0000'
        },
        shape: {
          type: 'triangle',
        },
      }
    };
  }

  validateLogin() {
    this.errorMessage = '';
    this.authService.validateLogin(this.model.username, this.model.password).subscribe((response: LoginResponse) => {
     
      if (response.success) {
        if(response['username']=="admin"){
          localStorage.setItem("showAdminItems", "true");
          localStorage.setItem(NG_AUTH_TOKEN, response.token);
          this.router.navigate(['/' + ROUTES_PATH.dashboard]);
        }else{
          localStorage.setItem("showAdminItems", "false");
          localStorage.setItem(NG_AUTH_TOKEN, response.token);
          this.router.navigate(['/' +"introMessage"]);
        }
      
      } else {
        this.errorMessage = response.message || 'Technical error';
      }
    });
  }


}
