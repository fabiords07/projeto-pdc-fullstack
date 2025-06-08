import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Plano } from '../models/plano.interface';
import { ContactMessage } from '../models/contact-message.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanosService {
  private readonly apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getPlanos(): Observable<Plano[]> {
    return this.http.get<any[]>(`${this.apiUrl}/plans/`)
      .pipe(
        map(response => this.mapPlanosResponse(response)),
        retry(2),
        catchError(this.handleError)
      );
  }

  enviarContato(contato: ContactMessage): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact/`, contato)
      .pipe(
        catchError(this.handleError)
      );
  }

  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private mapPlanosResponse(response: any[]): Plano[] {
    return response.map(item => ({
      id: item.id,
      nome: item.name,
      valor: parseFloat(item.price),
      descricao: item.description,
      ordem: item.order
    }));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {

      errorMessage = `Erro: ${error.error.message}`;
    } else {
     
      switch (error.status) {
        case 0:
          errorMessage = 'Não foi possível conectar com o servidor. Verifique se a API está rodando.';
          break;
        case 400:
          errorMessage = 'Dados inválidos enviados para o servidor.';
          break;
        case 404:
          errorMessage = 'Endpoint não encontrado.';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor.';
          break;
        default:
          errorMessage = `Erro do servidor: ${error.status} - ${error.message}`;
      }
    }
    
    console.error('Erro na API:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}