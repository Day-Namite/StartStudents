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
  fotoSelecionada: string | ArrayBuffer | null = null;
  arquivoFoto: File | null = null;

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

  onEscolherFoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const arquivo = input.files[0];
      this.arquivoFoto = arquivo;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoSelecionada = e.target?.result || null;
      };
      reader.readAsDataURL(arquivo);
    }
  }

  onCpfInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      input.value = valor;
      this.alunoForm.patchValue({ cpf: valor });
    }
  }

  onTelefoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    if (valor.length <= 11) {
      valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
      valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
      input.value = valor;
      this.alunoForm.patchValue({ telefone: valor });
    }
  }

  cancelar(): void {
    this.router.navigate(['/alunos']);
  }

  cadastrar(): void {
    if (this.alunoForm.valid) {
      const novoAluno = {
        ...this.alunoForm.value,
        foto: this.fotoSelecionada
      };

      console.log('Novo aluno:', novoAluno);

      this.router.navigate(['/alunos']);
    } else {
      this.marcarCamposComoTocados();
    }
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.alunoForm.controls).forEach(campo => {
      const controle = this.alunoForm.get(campo);
      controle?.markAsTouched();
    });
  }

  get nomeCompleto() {
    return this.alunoForm.get('nomeCompleto');
  }

  get email() {
    return this.alunoForm.get('email');
  }

  get cpf() {
    return this.alunoForm.get('cpf');
  }

  get telefone() {
    return this.alunoForm.get('telefone');
  }

  get formularioValido(): boolean {
    return this.alunoForm.valid;
  }
}
