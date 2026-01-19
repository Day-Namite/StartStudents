import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Interface que define a estrutura de um Aluno
interface Aluno {
  matricula: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  status: 'Ativo' | 'Inativo';
  urlFoto?: string;
}

@Component({
  selector: 'app-detalhes-do-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes-do-aluno.html',
  styleUrl: './detalhes-do-aluno.scss'
})
export class DetalhesDoAlunoComponent implements OnInit {
  aluno: Aluno | null = null;
  matricula: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
    this.carregarDadosAluno();
  }

  carregarDadosAluno() {

    this.aluno = {
      matricula: this.matricula,
      nome: 'Inês Brasil',
      cpf: '012.345.678-00',
      email: 'ines.brasil@email.com',
      telefone: '(99) 90011-2233',
      status: 'Ativo'
    };
  }

  voltarParaLista() {
    this.router.navigate(['/alunos']);
  }
}
