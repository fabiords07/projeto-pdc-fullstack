# Backend - API Django

API REST desenvolvida em Django para gerenciamento de planos odontológicos e mensagens de contato.

## 🚀 Tecnologias Utilizadas

- **Python 3.13**
- **Django 5.2**
- **Django REST Framework**
- **SQLite**
- **Django CORS Headers**

## 📋 Funcionalidades

### 🦷 **Planos Dentais**
- ✅ Listagem de planos odontológicos
- ✅ 6 planos predefinidos (Essencial, Conforto, Completo, Premium, Elite, Platinum)
- ✅ Filtros e ordenação
- ✅ Interface administrativa

### 📧 **Sistema de Contato**
- ✅ Recebimento de mensagens via API
- ✅ Validação robusta de dados
- ✅ Armazenamento no banco de dados
- ✅ Interface administrativa para visualizar mensagens

### 🔧 **Recursos Técnicos**
- ✅ API REST com Django REST Framework
- ✅ CORS configurado para frontend
- ✅ Validações customizadas
- ✅ Sistema de migrações
- ✅ Comandos personalizados
- ✅ Testes unitários

## 🛠️ Instalação e Configuração

### **1. Pré-requisitos**
```bash
Python 3.8+
pip (gerenciador de pacotes Python)
```

### **2. Clonar o repositório**
```bash
git clone https://github.com/fabiords07/projeto-pdc-fullstack
cd projeto-pdc-fullstack/backend
```

### **3. Criar ambiente virtual**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

### **4. Instalar dependências**
```bash
pip install -r requirements.txt
```

### **5. Configurar banco de dados**
```bash
# Criar migrações
python manage.py makemigrations

# Aplicar migrações
python manage.py migrate
```

### **6. Criar superusuário**
```bash
python manage.py createsuperuser
```

### **7. Popular dados iniciais**
```bash
python manage.py populate_plans
```

### **8. Iniciar servidor**
```bash
python manage.py runserver
```

A API estará disponível em: `http://localhost:8000`

## 📡 Endpoints da API

### **📊 Status**
```http
GET /api/status/
```
**Resposta:**
```json
{
    "status": "online",
    "message": "API Dental funcionando corretamente!",
    "endpoints": {
        "plans": "/api/plans/",
        "contact": "/api/contact/",
        "status": "/api/status/"
    }
}
```

### **🦷 Listar Planos**
```http
GET /api/plans/
```
**Resposta:**
```json
[
    {
        "id": "uuid-here",
        "name": "Plano Essencial",
        "price": "30.00",
        "description": "Rol ANS, Prótese unitária em dentes anteriores...",
        "order": 1
    }
]
```

### **📧 Enviar Mensagem**
```http
POST /api/contact/
Content-Type: application/json

{
    "name": "João Silva",
    "phone": "(83) 99999-9999",
    "email": "joao@email.com",
    "message": "Gostaria de mais informações sobre os planos."
}
```

**Resposta de Sucesso:**
```json
{
    "message": "Mensagem enviada com sucesso!",
    "data": {
        "id": "uuid-here",
        "name": "João Silva",
        "phone": "(83) 99999-9999",
        "email": "joao@email.com",
        "message": "Gostaria de mais informações...",
        "created_at": "2025-06-08T15:30:00Z"
    }
}
```

**Resposta de Erro (400):**
```json
{
    "message": "Erro ao enviar mensagem.",
    "errors": {
        "name": ["Nome deve ter pelo menos 2 caracteres."],
        "email": ["Enter a valid email address."],
        "phone": ["Telefone deve ter pelo menos 10 dígitos."],
        "message": ["Mensagem deve ter pelo menos 10 caracteres."]
    }
}
```

## 🎯 Modelos de Dados

### **DentalPlan**
```python
- id: UUID (chave primária)
- name: CharField (nome do plano)
- price: DecimalField (preço)
- description: TextField (descrição)
- order: PositiveIntegerField (ordem de exibição)
- is_active: BooleanField (ativo/inativo)
- created_at: DateTimeField (data de criação)
- updated_at: DateTimeField (data de atualização)
```

### **ContactMessage**
```python
- id: UUID (chave primária)
- name: CharField (nome do contato)
- phone: CharField (telefone)
- email: EmailField (email)
- message: TextField (mensagem)
- created_at: DateTimeField (data de envio)
- is_read: BooleanField (lida/não lida)
```

## 🔐 Interface Administrativa

Acesse a interface administrativa em: `http://localhost:8000/admin/`

### **Funcionalidades do Admin:**
- 📋 **Gerenciar Planos Dentais**
  - Criar, editar e excluir planos
  - Ativar/desativar planos
  - Ordenar planos por preço ou ordem
  
- 📧 **Visualizar Mensagens de Contato**
  - Ver todas as mensagens recebidas
  - Marcar como lida/não lida
  - Filtrar por data e status
  - Buscar por nome, email ou telefone

## 🧪 Testes

### **Executar todos os testes:**
```bash
python manage.py test
```

### **Executar testes específicos:**
```bash
python manage.py test plans.tests.DentalPlanModelTest
python manage.py test plans.tests.ContactMessageAPITest
```

### **Cobertura dos testes:**
- ✅ Modelos DentalPlan e ContactMessage
- ✅ Serializers e validações
- ✅ Views e endpoints da API
- ✅ Casos de sucesso e erro

## 🚀 Comandos Úteis

### **Gerenciamento de dados:**
```bash
# Popular planos iniciais
python manage.py populate_plans

# Limpar e recriar banco
python manage.py flush
python manage.py migrate
python manage.py populate_plans

# Backup do banco
python manage.py dumpdata > backup.json

# Restaurar backup
python manage.py loaddata backup.json
```

### **Desenvolvimento:**
```bash
# Verificar problemas
python manage.py check

# Executar shell Django
python manage.py shell

# Coletar arquivos estáticos
python manage.py collectstatic

# Ver migrações
python manage.py showmigrations
```

## 🌐 Configuração CORS

O projeto está configurado para aceitar requisições do frontend Angular:

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:4200",  # Angular
]
```

## 📦 Dependências Principais

```txt
Django>=4.2.0
djangorestframework>=3.14.0
django-cors-headers>=4.0.0
```

## 🔧 Configurações de Desenvolvimento

### **Variáveis de Ambiente (Opcional)**
Crie um arquivo `.env` na raiz do projeto:
```env
DEBUG=True
SECRET_KEY=sua-chave-secreta-aqui
ALLOWED_HOSTS=localhost,127.0.0.1
```

### **Configurações de Produção**
Para produção, altere no `settings.py`:
```python
DEBUG = False
ALLOWED_HOSTS = ['seu-dominio.com']
DATABASES = {
    # Configuração do PostgreSQL ou MySQL
}
```

## 🐛 Solução de Problemas

### **Erro de migração:**
```bash
python manage.py makemigrations --empty plans
python manage.py migrate
```

### **Erro de CORS:**
Verifique se o frontend está rodando na porta configurada em `CORS_ALLOWED_ORIGINS`

### **Erro de importação:**
```bash
pip install -r requirements.txt
```

### **Banco corrompido:**
```bash
rm db.sqlite3
python manage.py migrate
python manage.py populate_plans
```
