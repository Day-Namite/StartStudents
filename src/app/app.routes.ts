
import type { Routes } from '@angular/router';
import { TelaDeLoginComponent } from './components/tela-de-login/tela-de-login';
import { AlunosComponent } from './alunos/alunos.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: TelaDeLoginComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: '**', redirectTo: 'login' },
];
