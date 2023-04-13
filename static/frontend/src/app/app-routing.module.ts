import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPageComponent} from "./components/start-page/start-page.component";
import {CreateStyleComponent} from "./components/create-style/create-style.component";
import {StylesComponent} from "./components/styles/styles.component";
import {RegistrationPageComponent} from "./components/registration-page/registration-page.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'create-style', component: CreateStyleComponent },
  { path: 'styles', component: StylesComponent },
  { path: 'sign-in', component: RegistrationPageComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'test', component: LoginPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
