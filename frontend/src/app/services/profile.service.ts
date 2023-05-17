import { Injectable } from '@angular/core';
import { Profile } from "../interface/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private User : Profile = {
    registered: false,
  };

  constructor() { }

  get_user(): Profile {
    return this.User;
  }
  register(user: Profile) {
    this.User.registered=true;
    this.User.username=user.username;
    this.User.email=user.email;
  }
  is_registered(): boolean {
    // @ts-ignore
    return this.User.registered;
  }
  login() {
    this.User.registered = true;
  }
}
