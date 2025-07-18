# Projeto Gráficos - Setup Rápido

## ⚙️ Requisitos

- Python 3.11+
- Node.js 20.19+ (recomendado: via NVM)
- pip
- npm

---

## 🔧 Backend (Django)

### Linux / WSL / MacOS

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# (se necessário)
pip install -r requirements.txt --break-system-packages
python manage.py migrate
python manage.py runserver
```

### Windows (cmd ou PowerShell)

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Acesse: [http://127.0.0.1:8000](http://127.0.0.1:8000)

### 🌐 Endpoints úteis

- `/admin/` → Painel administrativo Django (requer login de superusuário)
- `/api/vendas/` → Retorna vendas por bairro em JSON
- `/api/vendas/semana/` → Retorna vendas por semana em JSON (uma linha por bairro)

---

## 💻 Frontend (React + Vite)

### Linux / WSL / MacOS

#### Instalar NVM e Node.js 22

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
```

### Windows

Baixe e instale o Node.js diretamente do site: 👉 [https://nodejs.org/en/download](https://nodejs.org/en/download) (versão 22.x.x)

### Instalar e rodar o projeto (com Node instalado)

```bash
cd frontend/
npm install
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 📁 Estrutura do Projeto

```
raiz-do-projeto/
├── imovei_api/               # Backend Django
│   ├── vendas/               # App principal (vendas)
│   │   ├── models.py         # Modelos de dados
│   │   ├── views.py          # Lógica de visualização (vendas por bairro e semana)
│   │   ├── urls.py           # Rotas do app vendas
│   │   ├── admin.py          # Registro no admin
│   │   ├── migrations/       # Migrações de banco de dados
│   ├── imovei_api/           # Configurações do Django (settings, urls, wsgi)
│   ├── manage.py             # Comando principal do Django
│   ├── requirements.txt
├── frontend/                 # Frontend React + Vite
│   ├── src/                  # Componentes e estilos
│   │   ├── components/
│   │   │   ├── GraficoBase.jsx
│   │   │   ├── GraficoVendasPorBairro.jsx
│   │   │   ├── GraficoVendasPorSemana.jsx
│   ├── index.html
│   ├── package.json
├── db.sqlite3                # Banco SQLite local
└── README.md
```
