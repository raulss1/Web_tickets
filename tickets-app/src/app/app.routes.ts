import { Routes } from '@angular/router';
import { HomePage } from './Pages/home/home';
import { LoginPage } from './Pages/login/login';
import { RegisterPage } from './Pages/register/register';
import { TicketExtractPage } from './Pages/ticket-extract/ticket-extract';
import { HistoryPage } from './Pages/history/history';
import { TicketNumPage } from './Pages/ticket-num/ticket-num';

export const routes: Routes = [
    {path: '', component: LoginPage},
    {path: 'register', component: RegisterPage},
    {path: 'dashboard', component: HomePage},
    {path: 'ticket', component: TicketExtractPage},
    {path: 'history', component: HistoryPage},
    {path: 'ticket/:id', component: TicketNumPage}
];
