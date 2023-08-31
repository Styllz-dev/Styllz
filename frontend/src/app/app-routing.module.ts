import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// подключение компонент
import {StartPageComponent} from "./components/start-page/start-page.component";
import {RegistrationPageComponent} from "./components/registration-page/registration-page.component";
import {ProfilePageComponent} from "./components/profile-page/profile-page.component";

const routes: Routes = [
    {path: '', component: StartPageComponent},

    {path: 'register', component: RegistrationPageComponent},

    {path: 'profile', component: ProfilePageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
