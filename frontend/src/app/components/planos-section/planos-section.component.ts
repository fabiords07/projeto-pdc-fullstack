import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanosService } from '../../services/planos.service';
import { Plano } from '../../models/plano.interface';

@Component({
  selector: 'app-planos-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planos-section.component.html',
  styleUrls: ['./planos-section.component.css']
})
export class PlanosSectionComponent implements OnInit {
  planos: Plano[] = [];
  planosFiltrados: Plano[] = [];
  termoBusca: string = '';
  filtroPreco: string = '';
  loading: boolean = true;
  erro: string = '';

  constructor(private planosService: PlanosService) {}

  ngOnInit(): void {
    this.carregarPlanos();
  }

  carregarPlanos(): void {
    this.loading = true;
    this.erro = '';
    
    this.planosService.getPlanos().subscribe({
      next: (dados) => {
        console.log('Planos carregados:', dados);
        this.planos = dados;
        this.planosFiltrados = dados;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar planos:', error);
        this.erro = error.message || 'Erro ao carregar os planos. Verifique se a API está rodando.';
        this.loading = false;
      }
    });
  }

  filtrarPlanos(): void {
    let resultado = [...this.planos];

    if (this.termoBusca.trim()) {
      const termo = this.termoBusca.toLowerCase().trim();
      resultado = resultado.filter(plano =>
        plano.nome.toLowerCase().includes(termo) ||
        plano.descricao.toLowerCase().includes(termo)
      );
    }

    
    if (this.filtroPreco === 'maior') {
      resultado.sort((a, b) => b.valor - a.valor);
    } else if (this.filtroPreco === 'menor') {
      resultado.sort((a, b) => a.valor - b.valor);
    } else {
     
      resultado.sort((a, b) => a.ordem - b.ordem);
    }

    this.planosFiltrados = resultado;
  }

  onBuscaChange(): void {
    this.filtrarPlanos();
  }

  onFiltroChange(): void {
    this.filtrarPlanos();
  }

  limparFiltros(): void {
    this.termoBusca = '';
    this.filtroPreco = '';
    this.planosFiltrados = [...this.planos];
    this.filtrarPlanos();
  }

  trackByNome(index: number, plano: Plano): string {
    return plano.id;
  }

  getPrecoInteiro(valor: number): string {
    return Math.floor(valor).toString();
  }

  getPrecoCentavos(valor: number): string {
    const centavos = Math.round((valor % 1) * 100);
    return centavos.toString().padStart(2, '0');
  }

  /**
   * Método para testar conexão com a API
   */
  testarAPI(): void {
    this.planosService.getStatus().subscribe({
      next: (response) => {
        console.log('Status da API:', response);
        alert('API está funcionando! ✅\n\n' + JSON.stringify(response, null, 2));
      },
      error: (error) => {
        console.error('Erro ao testar API:', error);
        alert('Erro ao conectar com a API ❌\n\n' + error.message);
      }
    });
  }
}