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
		// @ts-ignore
		var username = document.getElementById('login-name').value;
		// @ts-ignore
		var password = document.getElementById('login-password').value;

		const data: UserLogin = {
			username: username,
			password: password
		}

		this.login_service.create(data).subscribe(
			response => {
				this.profile.register({
					username: username,
					registered: true,
					email: "",
				})
			},
			error => {
				console.log(error);
			}
		)

		this.router.navigate(['']);
	}

	register(): void {
		// @ts-ignore
		var username = document.getElementById('registration-name').value;
		// @ts-ignore
		var email = document.getElementById('registration-email').value;
		// @ts-ignore
		var password1 = document.getElementById('registration-password1').value;
		// @ts-ignore
		var password2 = document.getElementById('registration-password2').value;

		if (password2 != password1) {
			// @ts-ignore
			document.getElementById('password2-icon').style.display='block';
			// @ts-ignore
			document.getElementById('password2-content').innerHTML='<p>passwords are not the same</p>'
		}
		else {
			// @ts-ignore
			document.getElementById('password2-icon').style.display='none';
		}
		if (!('a' <= username[0] && username[0] <= 'z') || username.length > 16) {
			// @ts-ignore
			document.getElementById('username-icon').style.display='block'
			if (username.length > 16) {
				// @ts-ignore
				document.getElementById('username-content').innerHTML = '<p>too long username</p>';
			} else {
				// @ts-ignore
				document.getElementById('username-content').innerHTML = '<p>username should start with a letter</p>';
			}
		}
		else {
			// @ts-ignore
			document.getElementById('username-icon').style.display='none'
		}

		//TODO сделать отображение ошибок и подсказки что не так для удобства пользователя
		if (password2 == password1 && ('a' <= username[0] && username[0] <= 'z') && username.length <= 16) {
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

	show_content(id:string) {
		// @ts-ignore
		document.getElementById(id).style.display='block';
	}
	hide_content(id:string) {
		// @ts-ignore
		document.getElementById(id).style.display='none';
	}
}
