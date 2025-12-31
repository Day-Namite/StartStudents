import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface Aluno {
  matricula: string;
  nome: string;
  status: 'Ativo' | 'Inativo';      
}

@Component({
  selector: "app-alunos",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./listagem-de-alunos.html",
  styleUrls: ["./listagem-de-alunos.scss"]
})
export class AlunosComponent {
  alunos: Aluno[] = [
    { matricula: '2023001', nome: 'Inês Brasil', status: 'Ativo' },
    { matricula: '2023002', nome: 'Juliana Pix', status: 'Inativo' },
    { matricula: '2023003', nome: 'Wanessa Wolf', status: 'Ativo' },
    { matricula: '2023034', nome: 'Davi Brito', status: 'Ativo' },
    { matricula: '2023038', nome: 'Anderson Neiff', status: 'Inativo' },
    { matricula: '2023067', nome: 'Raquel Brito', status: 'Ativo' }
  ];
 
  alunosFiltrados: Aluno[] = [...this.alunos];
  paginaAtual: number = 1;
  itensPorPagina: number = 4;
  termoBusca: string = '';
  totalPaginas: number = 1;

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

  novoAluno() {
    const matricula = prompt("Matrícula do novo aluno:");
    if (matricula === null || matricula.trim() === '') return;
   
    const nome = prompt("Nome do novo aluno:");
    if (nome === null || nome.trim() === '') return;
   
    const statusInput = prompt("Status do novo aluno (Ativo/Inativo):");
    if (statusInput === null || (statusInput !== 'Ativo' && statusInput !== 'Inativo')) {
      alert("Status inválido! Use 'Ativo' ou 'Inativo'");
      return;
    }
   
    this.alunos.push({ matricula, nome, status: statusInput as 'Ativo' | 'Inativo' });
    this.filtrarAlunos();
    alert("Aluno cadastrado com sucesso!");
  }

  toggleStatus(aluno: Aluno) {
    aluno.status = aluno.status === 'Ativo' ? 'Inativo' : 'Ativo';
    this.filtrarAlunos();
  }
}