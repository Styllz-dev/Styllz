import { Component, OnInit } from '@angular/core';
import { ProfileApiService } from "../../services/api/profile-api.service";
import { ProfileService } from "../../services/profile.service";
import { Profile } from "../../interface/profile";
import { LogoutService } from "../../services/api/logout.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public user: Profile={
    username: "",
    email: "",
    registered: false,
  };
  public change:boolean[]=[
      false, false, false,
  ]

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

}
