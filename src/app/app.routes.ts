
import type { Routes } from '@angular/router';  // type-only
import { TelaDeLoginComponent } from './components/tela-de-login/tela-de-login';
// Se você renomeou a pasta para 'components', troque o caminho para './components/...'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: TelaDeLoginComponent }
];
