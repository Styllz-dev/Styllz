import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { CreateStyleComponent } from './components/create-style/create-style.component';
import { StylesComponent } from './components/styles/styles.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from "@angular/forms";
import { NgOptimizedImage } from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
        StartPageComponent,
        TopBarComponent,
        CreateStyleComponent,
        StylesComponent,
        LoginPageComponent,
        RegistrationPageComponent,
        SettingsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        FormsModule,
        NgOptimizedImage,
    ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
