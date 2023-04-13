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
  is_registered(): boolean {
    return this.User.registered;
  }
  login() {
    this.User.registered = true;
  }
}
