import { Routes } from '@angular/router';
import { HomePage } from './Pages/home/home';
import { LoginPage } from './Pages/login/login';
import { RegisterPage } from './Pages/register/register';

export const routes: Routes = [
    {path: '', component: LoginPage},
    {path: 'register', component: RegisterPage},
    {path: 'dashboard', component: HomePage},
];
