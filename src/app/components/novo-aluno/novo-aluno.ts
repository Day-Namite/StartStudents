
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-novo-aluno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './novo-aluno.html',
  styleUrls: ['./novo-aluno.scss']
})
export class NovoAlunoComponent {
  alunoForm: FormGroup;

  // Para exibir img
  fotoSelecionada: string | ArrayBuffer | null = null;

  arquivoFoto: File | null = null;

  erroFoto: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.alunoForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/)]]
    });
  }

  // Foto
  onEscolherFoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files && input.files[0] ? input.files[0] : null;

    this.erroFoto = null;

    if (!arquivo) return;

    const isJpgByExt = /jpe?g$/i.test(arquivo.name);
    const isJpgByMime = arquivo.type === 'image/jpeg';

    if (!isJpgByExt && !isJpgByMime) {
      this.erroFoto = 'A foto precisa ser JPG (.jpg ou .jpeg).';
      this.resetFoto();
      return;
    }

    const max2MB = 2 * 1024 * 1024;
    if (arquivo.size > max2MB) {
      this.erroFoto = 'A foto não pode ultrapassar 2 MB.';
      this.resetFoto();
      return;
    }

    this.arquivoFoto = arquivo;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.fotoSelecionada = e.target?.result || null;

    };
    reader.readAsDataURL(arquivo);
  }

  private resetFoto() {
    this.arquivoFoto = null;
    this.fotoSelecionada = null;
  }

  // CPF
  onCpfInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '').slice(0, 11);

    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      input.value = valor;
      this.alunoForm.patchValue({ cpf: valor }, { emitEvent: false });
    }
  }

  // Telefone
  onTelefoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '').slice(0, 11);

    if (valor.length <= 11) {
      valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
      valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
      input.value = valor;
      this.alunoForm.patchValue({ telefone: valor }, { emitEvent: false });
    }
  }

  cancelar(): void {
    this.router.navigate(['/alunos']);
  }

  cadastrar(): void {
    if (!this.alunoForm.valid || this.erroFoto) {
      this.marcarCamposComoTocados();
      return;
    }

    const novoAluno = {
      ...this.alunoForm.value,
      foto: this.fotoSelecionada,
    };

    console.log('Novo aluno:', novoAluno);
    this.router.navigate(['/alunos']);
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.alunoForm.controls).forEach(campo => {
      this.alunoForm.get(campo)?.markAsTouched();
    });
  }

  get nomeCompleto() { return this.alunoForm.get('nomeCompleto'); }
  get email() { return this.alunoForm.get('email'); }
  get cpf() { return this.alunoForm.get('cpf'); }
  get telefone() { return this.alunoForm.get('telefone'); }

  get formularioValido(): boolean {
    // Considera erro de foto junto com o estado do form
    return this.alunoForm.valid && !this.erroFoto;
  }
}
