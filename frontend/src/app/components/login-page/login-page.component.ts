import { Component, OnInit } from '@angular/core';
import {LoginApiService} from "../../services/api/login.service";
import {RegisterApiService} from "../../services/api/register.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  imageUrl?: string;

  // @ts-ignore
  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }

  constructor() { }

  ngOnInit(): void {
  }

}
