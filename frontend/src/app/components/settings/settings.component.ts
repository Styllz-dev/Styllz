import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../../services/settings.service";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  faSun = faSun;
  faMoon = faMoon;

  constructor(private settings: SettingsService) { }

  ngOnInit(): void {
  }

  change_language(): void {
    this.settings.change_language("russian");
  }
  change_theme(): void {
    this.settings.change_theme();
    // @ts-ignore
    document.getElementById('body').style.background = (this.settings.get_color_theme());
    // @ts-ignore
    document.getElementById('body').style.color = (this.settings.get_color_theme() === 'white'? 'black' : 'white');
    // @ts-ignore
    document.getElementById('body').style.fill = (this.settings.get_color_theme() === 'white'? 'black' : 'white');
    // @ts-ignore
    document.getElementById('small-screen-form').style.background = this.settings.get_color_theme();
    // @ts-ignore
    document.getElementById('small-screen').style.fill = (this.settings.get_color_theme() === 'white'? 'black' : 'white');
    // @ts-ignore
    document.getElementById('profile-form').style.background = (this.settings.get_color_theme() === 'white'? 'black' : 'white');
    // @ts-ignore
    document.getElementById('profile-form').style.color = this.settings.get_color_theme();
    // @ts-ignore
    document.getElementById('main-header').style.background = this.settings.get_color_theme();
  }

}
