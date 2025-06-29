
# Arquitetura do Sistema

## Visão Geral

O AgendaBot segue uma arquitetura serverless otimizada para Cloudflare Pages, priorizando performance, escalabilidade e facilidade de manutenção.

## Componentes Principais

### Frontend (Cloudflare Pages)
- **Build**: Estático gerado com Vite
- **Runtime**: React 18 com TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Roteamento**: React Router v6 com code splitting
- **Estado**: React Query para server state + useState para local state

### Backend (Supabase)
- **Database**: PostgreSQL com Row Level Security (RLS)
- **Auth**: Supabase Auth com JWT
- **Realtime**: WebSocket subscriptions
- **Storage**: Arquivos e imagens
- **Edge Functions**: Lógica serverless quando necessário

### Integrações Externas
- **Evolution API**: WebSocket para WhatsApp Business
- **N8N**: Workflow automation via webhooks
- **Cal.com**: REST API para calendário
- **Asaas**: API de pagamentos e cobranças

## Fluxo de Dados

### 1. Requisições do Cliente
```
Cliente → Cloudflare CDN → React App (estático)
React App → Supabase (HTTPS + JWT)
```

### 2. Automações
```
Supabase Triggers → N8N Webhooks → Evolution API → WhatsApp
```

### 3. Agendamentos
```
WhatsApp → Evolution API → N8N → Supabase → React App (realtime)
```

## Padrões Arquiteturais

### Multi-tenancy
- **Isolamento**: Row Level Security por `company_id`
- **Customização**: Configurações por tenant em JSON
- **Escalabilidade**: Horizontal via Supabase

### Event-Driven
- **Database Triggers**: Automação via PostgreSQL functions
- **Webhooks**: Integração com serviços externos
- **Realtime Updates**: Supabase subscriptions

### JAMstack
- **Static**: HTML/CSS/JS pré-compilados
- **API**: Supabase como backend-as-a-service
- **Markup**: React components com SSG

## Segurança

### Autenticação
- JWT tokens via Supabase Auth
- Refresh token rotation
- Multi-factor authentication (planejado)

### Autorização
- Role-based access control (RBAC)
- Row Level Security (RLS) no PostgreSQL
- API key management para integrações

### Dados
- Criptografia em trânsito (HTTPS)
- Criptografia em repouso (Supabase)
- Backup automatizado diário

## Performance

### Frontend
- Code splitting por rota
- Lazy loading de componentes
- Bundle size otimizado (< 200KB gzipped)
- Service worker para cache (planejado)

### Backend
- Connection pooling (Supabase)
- Query optimization com índices
- CDN para assets estáticos
- Rate limiting por IP

## Monitoramento

### Métricas
- **Frontend**: Cloudflare Analytics + Core Web Vitals
- **Backend**: Supabase dashboard + custom metrics
- **Erros**: Sentry integration (planejado)

### Logs
- Supabase logs para database
- Cloudflare logs para CDN
- N8N execution logs para workflows

## Escalabilidade

### Horizontal
- Supabase: Auto-scaling
- Cloudflare: Global CDN
- N8N: Self-hosted com Docker

### Vertical
- Database: Upgrade automático via Supabase
- Compute: Serverless functions conforme demanda

## Backup & Recovery

### Dados
- Backup diário automatizado (Supabase)
- Point-in-time recovery
- Cross-region replication (plano pago)

### Código
- Git repository como source of truth
- Automated deployments via GitHub Actions
- Rollback via Cloudflare Pages

## Ambientes

### Development
- Local: Vite dev server + Supabase local
- Features: Hot reload + TypeScript checking

### Staging
- Cloudflare Pages (preview deployments)
- Supabase preview database
- Dados de teste automatizados

### Production
- Cloudflare Pages (main branch)
- Supabase production
- Monitoramento 24/7
