import type { Routes } from '@angular/router';
import { TelaDeLoginComponent } from './components/tela-de-login/tela-de-login';
import { AlunosComponent } from './components/listagem-de-alunos/listagem-de-alunos';
import { NovoAlunoComponent } from './components/novo-aluno/novo-aluno.js';
import { DetalhesDoAlunoComponent } from './components/detalhes-do-aluno/detalhes-do-aluno';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: TelaDeLoginComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'novo-aluno', component: NovoAlunoComponent },
  { path: 'detalhes-aluno/:matricula', component: DetalhesDoAlunoComponent },
  { path: '**', redirectTo: 'login' },
];
