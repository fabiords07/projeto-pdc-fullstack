import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactMessage, ContactResponse, ContactError } from '../models/contact-message.interface';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private readonly apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  enviarMensagem(contato: ContactMessage): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.apiUrl}/contact/`, contato)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido';
    let validationErrors: { [key: string]: string[] } = {};

    if (error.error instanceof ErrorEvent) {

      errorMessage = `Erro: ${error.error.message}`;
    } else {

      if (error.status === 400 && error.error?.errors) {

        validationErrors = error.error.errors;
        errorMessage = 'Dados inválidos. Verifique os campos e tente novamente.';
      } else {
        switch (error.status) {
          case 0:
            errorMessage = 'Não foi possível conectar com o servidor. Verifique se a API está rodando.';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
            break;
          default:
            errorMessage = error.error?.message || `Erro do servidor: ${error.status}`;
        }
      }
    }

    console.error('Erro no contato:', errorMessage, validationErrors);
    
    const customError = new Error(errorMessage) as any;
    customError.validationErrors = validationErrors;
    
    return throwError(() => customError);
  }
}