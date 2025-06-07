import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';

interface ContatoForm {
  nome: string;
  telefone: string;
  email: string;
  mensagem: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule, PhoneMaskDirective],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.css']
})
export class ContactSectionComponent {
  form: ContatoForm = {
    nome: '',
    telefone: '',
    email: '',
    mensagem: ''
  };

  enviando: boolean = false;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor() {}

  onSubmit(): void {
    if (this.validarFormulario()) {
      this.enviarFormulario();
    }
  }

  private validarFormulario(): boolean {
    this.mensagemErro = '';

    if (!this.form.nome.trim()) {
      this.mensagemErro = 'Nome é obrigatório';
      return false;
    }

    if (!this.form.telefone.trim()) {
      this.mensagemErro = 'Telefone é obrigatório';
      return false;
    }

    if (!this.form.email.trim()) {
      this.mensagemErro = 'Email é obrigatório';
      return false;
    }

    if (!this.isEmailValido(this.form.email)) {
      this.mensagemErro = 'Email deve ter um formato válido';
      return false;
    }

    if (!this.form.mensagem.trim()) {
      this.mensagemErro = 'Mensagem é obrigatória';
      return false;
    }

    return true;
  }

  private isEmailValido(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private enviarFormulario(): void {
    this.enviando = true;
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    setTimeout(() => {
      this.enviando = false;
      this.mensagemSucesso = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
      this.limparFormulario();
    }, 2000);
  }

  private limparFormulario(): void {
    this.form = {
      nome: '',
      telefone: '',
      email: '',
      mensagem: ''
    };
  }

  fecharMensagem(): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';
  }
}
