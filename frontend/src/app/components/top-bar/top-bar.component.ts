import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "../../services/profile.service";
import { ProfileApiService } from "../../services/api/profile-api.service";
import {Profile} from "../../interface/profile";
import {Logout} from "../../models/logout.model";
import {LogoutService} from "../../services/api/logout.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public user: Profile={
    username: "",
    email: "",
    registered: true,
  };
  constructor(
      private logout_api: LogoutService,
      private profile_api: ProfileApiService,
      public router: Router,
      public route: ActivatedRoute,
      public profile: ProfileService) { }

  ngOnInit(): void {
    this.update_account();
  }

  is_shown(): boolean {
    // @ts-ignore
    return document.getElementById('small-screen-form').style.height === 'calc(100vh - 100px)';
  }
  show(): void {
    // @ts-ignore
    if (document.getElementById('small-screen-form').style.height === '0px' || document.getElementById('small-screen-form').style.height === '') {
      // @ts-ignore
      document.getElementById('small-screen-form').style.height = 'calc(100vh - 100px)';
    } else {
      // @ts-ignore
      document.getElementById('small-screen-form').style.height = '0'
    }
  }

  go(link: string): void {
    try {
      // @ts-ignore
      document.getElementById('profile-details').open = false;
    } catch (exc) {
      console.log(exc);
    }
    this.router.navigate([link]);
  }

  out_user() {
    console.log(this.user);
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

    // @ts-ignore
    document.getElementById('profile-details').open=false;
  }
  update_account(): void {
    this.profile_api.get().subscribe(
        response=> {
          console.log(response);
          if(response!=null) {
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
}
