import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileApiService} from "../../services/api/profile-api.service";
import {LogoutService} from "../../services/api/logout.service";
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../interface/profile";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  public user: Profile={
    username: "",
    email: "",
    registered: false,
  };
  constructor(
      private logout_api: LogoutService,
      private profile_api: ProfileApiService,
      public profile: ProfileService,
      public router: Router,
      public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.update_account();
  }
  out_user() {
    console.log(this.user);
  }
  is_logged(): boolean {
    return !!this.user.registered;

  }
  logout() {
    const data="";
    this.logout_api.post(data).subscribe(
        response=> {
          this.profile.logout();
          this.user=this.profile.get_user();
        }, error=> {
        }
    )

    window.location.reload();
  }
  update_account(): void {
    this.profile_api.get().subscribe(
        response=> {
          console.log(response);
          if(response!=null&&response.email!="") {
            this.profile.register({
              username: response.username,
              registered: true,
              email: response.email
            })
          }
        }, error => {
        }
    )

    this.user=this.profile.get_user();
  }
  login(): void {
    if(this.user.registered) this.logout();
    else
      this.router.navigate(['/register']);
  }


  go(link:string) {
    this.router.navigate([link]);
  }
  to_login(type: string): void {
    if(this.user.registered) { if(type=='login') this.logout(); }
    else {
      this.router.navigate(['/register'])
      setTimeout(function () {
        if(type=='register') { // @ts-ignore
          document.getElementById('container').classList.add('right-panel-active');
        }
      }, 10)
    }
  }
}
