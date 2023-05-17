import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// подключение компонент
import {StartPageComponent} from "./components/start-page/start-page.component";
import {CreateStyleComponent} from "./components/create-style/create-style.component";
import {RegistrationPageComponent} from "./components/registration-page/registration-page.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {ProfileCompComponent} from "./components/profile-comp/profile-comp.component";

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'create-style', component: CreateStyleComponent },
  { path: 'sign-in', component: RegistrationPageComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileCompComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
