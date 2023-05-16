import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { CreateStyleComponent } from './components/create-style/create-style.component';
import { StylesComponent } from './components/styles/styles.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from "@angular/forms";
import { NgOptimizedImage } from "@angular/common";
// MatModule import
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";

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
        BrowserAnimationsModule,
        FontAwesomeModule,
        FormsModule,
        NgOptimizedImage,
        HttpClientXsrfModule.withOptions({
            cookieName: 'csrftoken',
            headerName: 'X-CSRFToken',
        }),
        // Mat Module Import
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatIconModule,
    ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
