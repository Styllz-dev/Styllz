import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LogoutService} from "../../services/api/logout.service";
import {ProfileApiService} from "../../services/api/profile-api.service";
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../interface/profile";


class ProfileMenu {
		public open: boolean = false;
		public close: boolean = false;

		constructor() {
				this.close = true;
				this.open = false;
		}

		change_status() {
				if (this.open) {
						this.open = false;
						this.close = true;
				} else {
						this.open = true;
						this.close = false;
				}
		}
}


@Component({
		selector: 'app-top-bar',
		templateUrl: './top-bar.component.html',
		styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
		public user: Profile = {
				username: "",
				email: "",
				registered: false,
				profile_image: "/static/assets/woman-icon.jpg",
		};
		private profile_menu_status: ProfileMenu = new ProfileMenu();

		constructor(
				public router: Router,
				public route: ActivatedRoute,
				private logout_api: LogoutService,
				private profile_api: ProfileApiService,
				public profile: ProfileService,
		) {
		}

		ngOnInit(): void {
				this.update_account();
		}

		out_user() {
				console.log(this.user);
		}

		is_logged(): boolean {
				return !!this.user.registered;
		}

		get_profile_img() {
				return this.user.profile_image;
		}

		get_profile_name() {
				return this.user.username;
		}

		logout() {
				const data = "";
				this.logout_api.post(data).subscribe(
						response => {
								this.profile.logout();
								this.user = this.profile.get_user();
						}, error => {
						}
				)

				this.close_menu();

				window.location.reload();
		}

		update_account(): void {
				this.profile_api.get().subscribe(
						response => {
								console.log(response);
								if (response != null && response.email != "") {
										this.profile.register({
												username: response.username,
												registered: true,
												email: response.email
										})
								}
						}, error => {
						}
				)

				this.user = this.profile.get_user();
		}

		login(): void {
				if (this.user.registered) this.logout();
				else
						this.router.navigate(['/register']);
		}

		logout_profile_menu() {
				this.connect_profile_menu();
				this.logout();
		}

		open_menu() {
				// @ts-ignore
				document.getElementById('menu').style.left = 'calc(-1*var(--padding-left))';
				// @ts-ignore
				document.getElementById('dop-menu').style.display = 'block';
				setTimeout(function () {
						// @ts-ignore
						document.getElementById('dop-menu').style.background = 'rgba(0,0,0,0.5)';
				}, 10)
		}

		is_opened() {
				// @ts-ignore
				return document.getElementById('menu').style.left == 'calc(-1*var(--padding-left))' || document.getElementById('menu').style.left == '0px';
		}

		close_menu() {
				// @ts-ignore
				document.getElementById('menu').style.left = 'calc(-1*(var(--width) + var(--padding-left)))';
				// @ts-ignore
				document.getElementById('dop-menu').style.background = 'rgba(0,0,0,0)';
				// @ts-ignore
				document.getElementById('dop-menu').style.display = 'none';
		}

		connect_profile_menu() {
				if (this.profile_menu_status.close) {
						// @ts-ignore
						document.getElementById('profile-menu-container').style.width = 'var(--width)';
						// @ts-ignore
						document.getElementById('icon-triangle').style.transform = 'rotate(90deg)';
						// @ts-ignore
						document.getElementById('to_profile-menu-container').style.display = 'block';
						setTimeout(function () {
								// @ts-ignore
								document.getElementById('to_profile-menu-container').style.background = 'rgba(0,0,0,.3)';
						}, 10)
				} else {
						// @ts-ignore
						document.getElementById('profile-menu-container').style.width = '0px';
						// @ts-ignore
						document.getElementById('icon-triangle').style.transform = 'rotate(0deg)';
						// @ts-ignore
						document.getElementById('to_profile-menu-container').style.display = 'none';
						// @ts-ignore
						document.getElementById('to_profile-menu-container').style.background = 'rgba(0,0,0,0)';

				}

				this.profile_menu_status.change_status();
		}

		go(link: string) {
				if (link[0] != '/') {
					this.close_menu();
					this.router.navigate(['/']);
					setTimeout(function () {
							window.scrollTo({
									// @ts-ignore
									top: document.getElementById(link).offsetTop,
									behavior: "smooth"
							})
					}, 300)
				} else {
					this.close_menu()
					this.router.navigate([link]);
					setTimeout(function () {
							window.scrollTo({
									// @ts-ignore
									top: 0,
									behavior: "smooth"
							})
					}, 300);
				}
		}

		go_by_profile(link: string) {
				this.router.navigate([link]);
				this.connect_profile_menu();
		}

		check(link: string): boolean {
				if (ActivatedRoute.name == '') {
						// @ts-ignore
						if (window.scrollY >= document.getElementById(link).offsetTop && window.scrollY <= document.getElementById(link).offsetTop + document.getElementById(link).offsetHeight)
								return true;
				}
				return false;
		}
}