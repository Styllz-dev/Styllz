import { Component, OnInit } from '@angular/core';
import { LoginApiService } from "../../services/api/login.service";
import { RegisterApiService } from "../../services/api/register.service";
import { UserRegister } from "../../models/user-register.model";
import { UserLogin } from "../../models/user-login.model";
import { ProfileService } from "../../services/profile.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private login_service: LoginApiService,
      private profile: ProfileService,
      private register_service: RegisterApiService) { }

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // @ts-ignore
    signUpButton.addEventListener('click', () => {
      // @ts-ignore
      container.classList.add("right-panel-active");
    });

    // @ts-ignore
    signInButton.addEventListener('click', () => {
      // @ts-ignore
      container.classList.remove("right-panel-active");
    });
  }

  login(): void {
    // @ts-ignore
    var username=document.getElementById('registration-name').value;
    // @ts-ignore
    var password=document.getElementById('registration-password2').value;

    const data: UserLogin = {
      username: username,
      password: password
    }

    this.login_service.create(data).subscribe(
        response=> {
          console.log(response);
        }, error => {
          console.log(error);
        }
    )
  }
  register(): void {
    // @ts-ignore
    var username=document.getElementById('registration-name').value;
    // @ts-ignore
    var email=document.getElementById('registration-email').value;
    // @ts-ignore
    var password1=document.getElementById('registration-password1').value;
    // @ts-ignore
    var password2=document.getElementById('registration-password2').value;

    if (password2==password1) {
      const data: UserRegister = {
        username: username,
        email: email,
        password: password1,
      }

      this.register_service.create(data).subscribe(
          response => {
            console.log(response);
            this.profile.register({
              username: username,
              registered: true,
              email: email,
            })
            this.router.navigate(['']);
          }, error => {
            console.log(error);
          }
      );
    }
  }
}
