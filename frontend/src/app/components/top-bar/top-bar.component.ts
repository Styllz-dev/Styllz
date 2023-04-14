import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
    constructor(public router: Router, public route: ActivatedRoute, public profile: ProfileService) { }

  ngOnInit(): void {
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
  show_profile_form(): void {
    // @ts-ignore
    let height = document.getElementById('profile-form').style.height;
    if (height === '0px' || height === '0' || height === '') {
      // @ts-ignore
      document.getElementById('profile-form').style.height = '200px';
      // @ts-ignore
      document.getElementById("profile-icon").style.transform = 'rotate(0deg)'
    } else {
      // @ts-ignore
      document.getElementById('profile-form').style.height = '0';
      // @ts-ignore
      document.getElementById("profile-icon").style.transform = 'rotate(90deg)'

    }
  }

  go(link: string): void {
    this.router.navigate([link]);
  }

  login(): void {
    this.profile.login();
  }

  out() {
      console.log(this.router);
  }
}
