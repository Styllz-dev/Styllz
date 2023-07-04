import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { LogoutService } from "../../services/api/logout.service";
import { ProfileApiService } from "../../services/api/profile-api.service";
import { ProfileService } from "../../services/profile.service";
import { Profile } from "../../interface/profile";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public user: Profile={
    username: "",
    email: "",
    registered: false,
  };
  constructor(
      public router: Router,
      public route: ActivatedRoute,
      private logout_api: LogoutService,
      private profile_api: ProfileApiService,
      public profile: ProfileService,
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

    this.close_menu();
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

  open_menu() {
    // @ts-ignore
    document.getElementById('menu').style.left='calc(-1*var(--padding-left))';
    // @ts-ignore
    document.getElementById('dop-menu').style.display='block';
    setTimeout(function () {
      // @ts-ignore
      document.getElementById('dop-menu').style.background='rgba(0,0,0,0.5)';
      // @ts-ignore
      console.log(document.getElementById('menu').style.left);
    }, 10)
  }
  is_opened() {
    // @ts-ignore
    return document.getElementById('menu').style.left=='calc(-1*var(--padding-left))'||document.getElementById('menu').style.left=='0px';
  }
  close_menu() {
    // @ts-ignore
    document.getElementById('menu').style.left='calc(-1*(var(--width) + var(--padding-left)))';
    // @ts-ignore
    document.getElementById('dop-menu').style.background='rgba(0,0,0,0)';
    // @ts-ignore
    document.getElementById('dop-menu').style.display='none';
  }

  go(link:string) {
    if(link[0]!='/') {
      this.router.navigate(['/']);
      setTimeout(function(){
        window.scrollTo({
          // @ts-ignore
          top: document.getElementById(link).offsetTop,
          behavior: "smooth"
        })
      }, 10)
    }
    else {
      this.router.navigate([link]);
      setTimeout(function(){
        window.scrollTo({
          // @ts-ignore
          top: 0,
          behavior: "smooth"
        })
      }, 10)
    }
    this.close_menu();
  }
  check(link: string):boolean {
    if(ActivatedRoute.name=='') {
      // @ts-ignore
      if (window.scrollY >= document.getElementById(link).offsetTop && window.scrollY <= document.getElementById(link).offsetTop + document.getElementById(link).offsetHeight)
        return true;
    }
    return false;
  }
}
