import {Component, OnInit} from '@angular/core';
import {LoginApiService} from "../../services/api/login.service";
import {RegisterApiService} from "../../services/api/register.service";
import {UserRegister} from "../../models/user-register.model";
import {UserLogin} from "../../models/user-login.model";
import {ProfileService} from "../../services/profile.service";
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
		private register_service: RegisterApiService
	) {
	}

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
		document.getElementById('error-container')!.style.display='flex';
	}

	register(): void {
		document.getElementById('error-container')!.style.display='flex';
	}

	show_content(id:string) {
		// @ts-ignore
		document.getElementById(id).style.display='block';
	}
	hide_content(id:string) {
		// @ts-ignore
		document.getElementById(id).style.display='none';
	}
}
