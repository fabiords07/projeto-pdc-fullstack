import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Plano } from '../models/plano.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanosService {
  // FUTURO: para quando o backend estiver pronto:
  // private apiUrl = 'http://localhost:8000/api/planos';

  private planosMock: Plano[] = [
    {
      id: 1,
      nome: 'Plano Dental 1',
      valor: 30.00,
      descricao: 'Rol ANS, Prótese unitária em dentes anteriores e posteriores em cerômero, Procedimentos em ortodontia'
    },
    {
      id: 2,
      nome: 'Plano Dental 2',
      valor: 80.00,
      descricao: 'Plano Dental 1, Prótese removível (inclusive prótese total), prótese unitária em dentes anteriores e posteriores em cerômero.'
    },
    {
      id: 3,
      nome: 'Plano Dental 3',
      valor: 150.00,
      descricao: 'Plano Dental 2, Documentação ortodôntica completa*, manutenção mensal, clareamento com moldeira (gel + moldeira) e placa miorrelaxante.'
    },
    {
      id: 4,
      nome: 'Plano Dental 4',
      valor: 200.00,
      descricao: 'Plano Dental 3, Prótese fixa, inclusive em porcelana, e clareamento em consultório.'
    },
    {
      id: 5,
      nome: 'Plano Dental 5',
      valor: 250.00,
      descricao: 'Plano Dental 4, Cobertura ortodôntica com alinhador invisível com instalação, Prótese unitária em dentes anteriores e posteriores em cerômero.'
    },
    {
      id: 6,
      nome: 'Plano Dental 6',
      valor: 300.00,
      descricao: 'Plano Dental 5, Restauração, Extração, Clareamento em gel e moldeira (caseiro), Placa miorrelaxante, E muito mais.'
    }
  ];

  constructor() {}

  getPlanos(): Observable<Plano[]> {
    // ATUAL: usando dados mockados
    return of(this.planosMock);

    // FUTURO: para quando o backend estiver pronto:
    // return from(axios.get(this.apiUrl)).pipe(
    //   map(response => response.data),
    //   catchError(error => {
    //     console.error('Erro ao carregar planos:', error);
    //     return of([]);
    //   })
    // );
  }
}
