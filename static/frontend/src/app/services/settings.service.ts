import { Injectable } from '@angular/core';
import { Parameters } from "../interface/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private Settings: Parameters = {
    theme: "black",
    language: "english",
  }

  constructor() { }

  change_theme(): void {
    if (this.Settings.theme == 'white') this.Settings.theme = 'dark';
    else this.Settings.theme = 'white';
  }

  change_language(language: string) {
    this.Settings.language = language;
  }

  get_theme(): string {
    return this.Settings.theme;
  }
  get_color_theme(): string {
    if (this.Settings.theme == 'white') return 'white';
    else return 'black';
  }
}
