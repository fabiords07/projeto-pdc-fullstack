import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContatoService } from '../../services/contato.service';
import { ContactMessage } from '../../models/contact-message.interface';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.css']
})
export class ContactSectionComponent {
  contato: ContactMessage = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  enviando: boolean = false;
  sucesso: boolean = false;
  erro: string = '';
  errorsValidacao: { [key: string]: string[] } = {};

  constructor(private contatoService: ContatoService) {}

  onSubmit(): void {
    if (this.enviando) return;

    this.limparMensagens();
    
    if (!this.validarFormulario()) {
      return;
    }

    this.enviando = true;

    this.contatoService.enviarMensagem(this.contato).subscribe({
      next: (response) => {
        console.log('Mensagem enviada com sucesso:', response);
        this.sucesso = true;
        this.limparFormulario();
        this.enviando = false;
        
        setTimeout(() => {
          this.sucesso = false;
        }, 5000);
      },
      error: (error) => {
        console.error('Erro ao enviar mensagem:', error);
        this.erro = error.message;
        this.errorsValidacao = error.validationErrors || {};
        this.enviando = false;
      }
    });
  }

  private validarFormulario(): boolean {
    this.errorsValidacao = {};
    let valido = true;

    if (!this.contato.name.trim()) {
      this.errorsValidacao['name'] = ['Nome é obrigatório'];
      valido = false;
    } else if (this.contato.name.trim().length < 2) {
      this.errorsValidacao['name'] = ['Nome deve ter pelo menos 2 caracteres'];
      valido = false;
    }

    if (!this.contato.email.trim()) {
      this.errorsValidacao['email'] = ['Email é obrigatório'];
      valido = false;
    } else if (!this.isEmailValido(this.contato.email)) {
      this.errorsValidacao['email'] = ['Email inválido'];
      valido = false;
    }

    const telefoneNumeros = this.contato.phone.replace(/\D/g, '');
    if (!this.contato.phone.trim()) {
      this.errorsValidacao['phone'] = ['Telefone é obrigatório'];
      valido = false;
    } else if (telefoneNumeros.length < 10) {
      this.errorsValidacao['phone'] = ['Telefone deve ter pelo menos 10 dígitos'];
      valido = false;
    } else if (telefoneNumeros.length > 11) {
      this.errorsValidacao['phone'] = ['Telefone deve ter no máximo 11 dígitos'];
      valido = false;
    } else if (!this.isTelefoneValido(telefoneNumeros)) {
      this.errorsValidacao['phone'] = ['Formato de telefone inválido'];
      valido = false;
    }

    if (!this.contato.message.trim()) {
      this.errorsValidacao['message'] = ['Mensagem é obrigatória'];
      valido = false;
    } else if (this.contato.message.trim().length < 10) {
      this.errorsValidacao['message'] = ['Mensagem deve ter pelo menos 10 caracteres'];
      valido = false;
    }

    return valido;
  }

  private isEmailValido(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isTelefoneValido(telefone: string): boolean {
    const numeros = telefone.replace(/\D/g, '');
    
    if (numeros.length < 10 || numeros.length > 11) {
      return false;
    }
    
    const ddd = parseInt(numeros.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
      return false;
    }
    
    if (numeros.length === 11) {
      const terceiroDig = parseInt(numeros.charAt(2));
      if (terceiroDig !== 9) {
        return false;
      }
    }
    
    const todosIguais = numeros.split('').every(digit => digit === numeros[0]);
    if (todosIguais) {
      return false;
    }
    
    return true;
  }

  private limparFormulario(): void {
    this.contato = {
      name: '',
      phone: '',
      email: '',
      message: ''
    };
  }

  private limparMensagens(): void {
    this.sucesso = false;
    this.erro = '';
    this.errorsValidacao = {};
  }

  getErroField(field: string): string {
    return this.errorsValidacao[field]?.[0] || '';
  }

  hasErroField(field: string): boolean {
    return !!this.errorsValidacao[field]?.length;
  }

  /**
   */
  formatarTelefone(): void {
    let telefone = this.contato.phone.replace(/\D/g, '');
    
    if (telefone.length > 11) {
      telefone = telefone.substring(0, 11);
    }
    
    if (telefone.length === 0) {
      this.contato.phone = '';
    } else if (telefone.length <= 2) {
      this.contato.phone = `(${telefone}`;
    } else if (telefone.length <= 6) {
      this.contato.phone = `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    } else if (telefone.length <= 10) {
      this.contato.phone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6)}`;
    } else {
      this.contato.phone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
    }
  }

  onTelefoneKeypress(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    
    if ([8, 9, 27, 13, 46].indexOf(charCode) !== -1 ||
        (charCode === 65 && event.ctrlKey === true) ||
        (charCode === 67 && event.ctrlKey === true) ||
        (charCode === 86 && event.ctrlKey === true) ||
        (charCode === 88 && event.ctrlKey === true)) {
      return;
    }
    
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
    
    if (this.contato.phone.length >= 15) {
      event.preventDefault();
    }
  }

  onTelefonePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    
    const apenasNumeros = pastedData.replace(/\D/g, '');
    
    const numeroLimitado = apenasNumeros.substring(0, 11);
    
    this.contato.phone = numeroLimitado;
    this.formatarTelefone();
  }
}