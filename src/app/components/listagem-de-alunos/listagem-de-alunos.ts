import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router'; // Adicione isso

interface Aluno {
  matricula: string;
  nome: string;
  status: 'Ativo' | 'Inativo';
}

@Component({
  selector: "app-listagem-de-alunos",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./listagem-de-alunos.html",
  styleUrls: ["./listagem-de-alunos.scss"]
})
export class AlunosComponent {
  alunos: Aluno[] = [
    { matricula: '2023001', nome: 'Inês Brasil', status: 'Ativo' }
  ];
  alunosFiltrados: Aluno[] = [...this.alunos];
  paginaAtual: number = 1;
  itensPorPagina: number = 4;
  termoBusca: string = '';
  totalPaginas: number = 1;

  // Adicione o Router no construtor
  constructor(private router: Router) {}

  ngOnInit() {
    this.filtrarAlunos();
  }

  filtrarAlunos() {
    if (this.termoBusca.trim() === '') {
      this.alunosFiltrados = [...this.alunos];
    } else {
      const termo = this.termoBusca.toLowerCase();
      this.alunosFiltrados = this.alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(termo) ||
        aluno.matricula.toLowerCase().includes(termo) ||
        aluno.status.toLowerCase().includes(termo)
      );
    }
    this.totalPaginas = Math.ceil(this.alunosFiltrados.length / this.itensPorPagina);
    if (this.totalPaginas < 1) this.totalPaginas = 1;
    if (this.paginaAtual > this.totalPaginas) {
      this.paginaAtual = this.totalPaginas;
    }
  }

  buscarAluno(event: Event) {
    const input = event.target as HTMLInputElement;
    this.termoBusca = input.value;
    this.paginaAtual = 1;
    this.filtrarAlunos();
  }

  getAlunosPaginados(): Aluno[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.alunosFiltrados.slice(inicio, fim);
  }

  irParaPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  getPaginas(): number[] {
    return Array.from({length: this.totalPaginas}, (_, i) => i + 1);
  }

  verDetalhes(aluno: Aluno) {
    alert(`Matrícula: ${aluno.matricula}\nNome: ${aluno.nome}\nStatus: ${aluno.status}`);
  }

  editarAluno(aluno: Aluno) {
    const novoNome = prompt("Editar nome do aluno:", aluno.nome);
    if (novoNome !== null && novoNome.trim() !== '') {
      const alvo = this.alunos.find(a => a.matricula === aluno.matricula);
      if (alvo) {
        alvo.nome = novoNome;
        this.filtrarAlunos();
      }
    }
  }

  excluirAluno(aluno: Aluno) {
    if (confirm(`Tem certeza que deseja excluir o aluno ${aluno.nome}?`)) {
      this.alunos = this.alunos.filter(a => a.matricula !== aluno.matricula);
      this.filtrarAlunos();
    }
  }

  // Método atualizado para redirecionar
  novoAluno() {
    this.router.navigate(['/novo-aluno']);
  }

  toggleStatus(aluno: Aluno) {
    aluno.status = aluno.status === 'Ativo' ? 'Inativo' : 'Ativo';
    this.filtrarAlunos();
  }
}
