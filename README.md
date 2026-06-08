# Configurador de Vendas

Sistema web full-stack para times comerciais: cadastro e gestão de leads, pipeline de vendas (Kanban), configurador de projetos com simulação de preço e margem em tempo real, geração de propostas, exportação em PDF e dashboard financeiro.

O sistema funciona como um "configurador inteligente" que transforma uma conversa comercial em uma proposta pronta para envio em poucos minutos.

---

## Funcionalidades

- **Autenticação** com e-mail e senha, sessão persistente e proteção de rotas.
- **Perfis de acesso** (Administrador e Comercial) com menu dinâmico e bloqueio de páginas restritas conforme o papel do usuário.
- **CRM de Leads** com CRUD completo (criar, listar, editar e excluir).
- **Pipeline de Vendas** em formato Kanban, com os negócios organizados por etapa.
- **Configurador de Projeto** com simulação de preço e margem em tempo real, conforme integrações, extras e complexidade selecionados.
- **Propostas** geradas a partir do configurador, com status editável (Rascunho, Enviada, Aceita, Recusada).
- **Exportação em PDF** das propostas, com layout pronto para envio ao cliente.
- **Dashboard** com métricas consolidadas e **Dashboard Financeiro** com gráficos (apenas para administradores).
- **Configurações** com preços do configurador editáveis pelo administrador, sem necessidade de alterar o código.

---

## Stack

- **Next.js** (App Router) + **React**
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (PostgreSQL, Auth e Row Level Security)
- **Recharts** (gráficos)
- **jsPDF** (geração de PDF)

---

## Arquitetura e decisões técnicas

- **Server e Client Components**: leitura de dados e operações sensíveis rodam no servidor; a interatividade (formulários, estado, gráficos) é isolada em Client Components.
- **Server Actions** para todas as operações de escrita, mantendo as credenciais sensíveis fora do navegador.
- **Segurança em camadas**: proteção de rotas via middleware, Row Level Security no banco e verificação de papel (role) no servidor para páginas administrativas.
- **Configuração dinâmica**: os valores usados no cálculo das propostas ficam no banco de dados e podem ser ajustados pela interface, separando dados de lógica.

---

## Estrutura do projeto

```
app/
├── (app)/              # Área autenticada (com sidebar)
│   ├── dashboard/      # Visão geral com métricas
│   ├── pipeline/       # Kanban de vendas
│   ├── leads/          # CRM de leads (CRUD)
│   ├── configurador/   # Simulador de preço e margem
│   ├── propostas/      # Propostas geradas
│   ├── financeiro/     # Dashboard financeiro (admin)
│   ├── configuracoes/  # Ajustes e preços (admin)
│   └── layout.tsx      # Layout com sidebar e perfil
├── login/              # Tela de login (sem sidebar)
├── components/         # Componentes reutilizáveis
├── lib/                # Clientes Supabase e utilitários
└── layout.tsx          # Layout raiz
middleware.ts           # Proteção de rotas
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18.18 ou superior
- Uma conta no [Supabase](https://supabase.com)

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/GustAndrade07/configurador-de-vendas.git
   cd configurador-de-vendas
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` na raiz com as credenciais do seu projeto Supabase:

   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_publishable_key
   SUPABASE_SECRET_KEY=sua_secret_key
   ```

4. Configure as tabelas no Supabase (`leads`, `propostas`, `profiles`, `configuracoes_preco`) e as políticas de acesso.

5. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Acesse [http://localhost:3000](http://localhost:3000).

> O arquivo `.env.local` não é versionado. As credenciais ficam apenas na máquina local.

---

## Status do projeto

As principais funcionalidades estão implementadas e funcionais. Próximos passos possíveis incluem integração com gateway de pagamento e refinamentos de permissão por papel.

---

## Autor

Desenvolvido por **Gustavo Andrade** — [GitHub](https://github.com/GustAndrade07)
