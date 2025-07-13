import { Routes } from '@angular/router';
import { LoginComponent } from './onboard/login/login.component';
import { RegisterComponent } from './onboard/register/register.component';
import { VerifyEmailComponent } from './onboard/verify-email/verify-email.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:'login',component:LoginComponent
    },
     {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'verify-email/:token',
        component:VerifyEmailComponent
    },
];
