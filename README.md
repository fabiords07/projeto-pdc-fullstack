# Projeto - Site Plano Odontológico

Este projeto foi desenvolvido como trabalho da disciplina Programação de Computadores para demonstrar conhecimentos em desenvolvimento web com Angular (frontend) e Python (backend).

## 👥 Equipe
- **Fabio Rangel** - Responsável por: Front End
- **Juan Pablo** - Responsável por: Back End

## 🦷 Sobre o Projeto
Site para apresentação de planos odontológicos com seções de apresentação, planos disponíveis e contato.

## 🚀 Tecnologias

### Frontend
- Angular 19.2.0
- Angular CLI 19.2.12
- TypeScript 5.7.2
- Tailwind CSS 4.1.7
- Angular Material 19.2.16
- Axios 1.9.0

### Backend
- Python 3.13
- Django 5.2.2
- SQLite 3

## 🔧 Como Executar

### Frontend
\`\`\`bash
cd frontend
npm install
ng serve
\`\`\`

### Backend
```
cd backend
python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt
python manage.py migrate && python manage.py createsuperuser
python manage.py populate_plans && python manage.py runserver
```
Acesse: http://localhost:8000

## 🦷 Funcionalidades
- ✅ Header com navegação
- ✅ Seção Hero (apresentação)
- ✅ Seção de Planos
- ✅ Seção de Contato
- ✅ Footer
- ✅ Design responsivo com Tailwind CSS
- ✅ Componentes Angular Material
