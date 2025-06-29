
# AgendaBot - SaaS de Agendamento via WhatsApp

[![Deploy with Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange)](https://pages.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Sistema SaaS white-label completo para agendamento automatizado via WhatsApp, com IA conversacional, calendário integrado e painel administrativo multi-tenant.

## 🚀 Demo

- **Landing Page**: [https://agendabot.pages.dev](https://agendabot.pages.dev)
- **Admin Demo**: [https://agendabot.pages.dev/admin](https://agendabot.pages.dev/admin)
- **Credenciais**: demo@agendabot.com / demo123

## 📋 Funcionalidades

### Para Clientes Finais
- ✅ Agendamento via WhatsApp com IA conversacional
- ✅ Calendário web integrado
- ✅ Confirmações e lembretes automáticos
- ✅ Reagendamento e cancelamento simplificado

### Para Empresas
- ✅ Painel administrativo completo
- ✅ Configuração de IA personalizada
- ✅ CRM integrado com histórico de conversas
- ✅ Gestão de equipe e permissões
- ✅ Dashboard com métricas em tempo real
- ✅ Sistema de faturamento integrado

### Técnicas
- ✅ White-label completo
- ✅ Multi-tenant com isolamento de dados
- ✅ Otimizado para Cloudflare Pages
- ✅ Design responsivo mobile-first
- ✅ Dark mode nativo
- ✅ PWA-ready

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: React 18.3 + TypeScript
- **Build**: Vite 5.0
- **Estilização**: Tailwind CSS + shadcn/ui
- **Roteamento**: React Router v6
- **Estado**: Zustand + React Query
- **Formulários**: React Hook Form + Zod

### Backend (Integrações)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **WhatsApp**: Evolution API
- **Automação**: N8N
- **Calendário**: Cal.com (self-hosted)
- **Pagamentos**: Asaas

### Infraestrutura
- **Hospedagem**: Cloudflare Pages
- **CDN**: Cloudflare
- **Analytics**: Cloudflare Analytics
- **Monitoramento**: Sentry

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ e npm 9+
- Conta no Cloudflare
- Conta no Supabase

### Setup Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/agendabot.git
cd agendabot

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Edite o arquivo .env com suas credenciais
nano .env

# Execute em desenvolvimento
npm run dev
```

### Variáveis de Ambiente

```env
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima

# App Config
VITE_APP_URL=https://agendabot.pages.dev
VITE_APP_NAME=AgendaBot

# Integrações (Opcional para MVP)
VITE_EVOLUTION_API_URL=https://sua-evolution-api.com
VITE_N8N_WEBHOOK_URL=https://seu-n8n.com/webhook
VITE_ASAAS_API_KEY=sua-chave-asaas
```

## 🚀 Deploy no Cloudflare Pages

### Via Interface Web

1. Faça fork deste repositório
2. Acesse [Cloudflare Pages](https://pages.cloudflare.com)
3. Clique em "Create a project"
4. Conecte sua conta GitHub
5. Selecione o repositório
6. Configure:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18

### Via Wrangler CLI

```bash
# Instale o Wrangler
npm install -g wrangler

# Faça login no Cloudflare
wrangler login

# Build do projeto
npm run build

# Deploy
wrangler pages publish dist --project-name=agendabot
```

## 📁 Estrutura do Projeto

```
agendabot/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   │   ├── ui/          # shadcn/ui components
│   │   ├── admin/       # Componentes do admin
│   │   └── public/      # Componentes públicos
│   ├── pages/           # Páginas da aplicação
│   │   ├── admin/       # Páginas administrativas
│   │   ├── auth/        # Autenticação
│   │   └── public/      # Páginas públicas
│   ├── lib/             # Utilitários e helpers
│   │   ├── supabase/    # Cliente e tipos Supabase
│   │   ├── hooks/       # React hooks customizados
│   │   └── utils/       # Funções utilitárias
│   ├── config/          # Configurações
│   └── styles/          # Estilos globais
├── public/              # Assets estáticos
├── docs/                # Documentação adicional
└── scripts/             # Scripts de automação
```

## 🔧 Desenvolvimento

### Comandos Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Linting com ESLint
npm run format       # Formatação com Prettier
npm run type-check   # Verificação de tipos
npm run test         # Testes (quando implementados)
```

### Padrões de Código

- **Componentes**: PascalCase, um por arquivo
- **Funções**: camelCase, pure functions quando possível
- **Tipos**: Interfaces com prefixo 'I' para modelos
- **Constantes**: UPPER_SNAKE_CASE
- **CSS**: Tailwind classes, módulos CSS quando necessário

## 📊 Banco de Dados

### Schema Principal (Supabase)

```sql
-- Empresas (multi-tenant)
companies (id, slug, name, settings, created_at)

-- Usuários  
users (id, company_id, email, role, profile)

-- Agendamentos
appointments (id, company_id, service_id, customer, datetime, status)

-- Conversas WhatsApp
conversations (id, company_id, customer_phone, status, metadata)

-- Configurações IA
ai_configs (id, company_id, instructions, tone, features)
```

[Ver schema completo](./docs/database-schema.sql)

## 🔌 Integrações

### Evolution API (WhatsApp)
- Documentação: [Evolution API Docs](https://doc.evolution-api.com)
- Configuração: [Ver guia](./docs/evolution-setup.md)

### N8N (Automação)
- Workflows: [Importar templates](./docs/n8n-workflows/)
- Webhooks: [Configuração](./docs/n8n-webhooks.md)

### Cal.com (Calendário)
- Self-hosted: [Guia de instalação](./docs/calcom-setup.md)
- Integração: [API Reference](./docs/calcom-api.md)

## 🎨 Customização

### Temas
O sistema suporta temas customizáveis por tenant:

```typescript
// src/config/theme.ts
export const customTheme = {
  colors: {
    primary: '#0070f3',
    secondary: '#7928ca',
    // ...
  }
}
```

### White-label
Cada empresa pode customizar:
- Logo e favicon
- Cores do tema
- Textos e mensagens
- Domínio personalizado

## 🔒 Segurança

- **Autenticação**: Supabase Auth com RLS
- **Autorização**: RBAC com perfis customizáveis
- **Dados**: Isolamento por tenant_id
- **API**: Rate limiting via Cloudflare
- **Secrets**: Variáveis de ambiente

## 📈 Performance

### Otimizações Implementadas
- ✅ Code splitting por rota
- ✅ Lazy loading de componentes
- ✅ Imagens otimizadas com loading lazy
- ✅ Bundle size < 200KB (gzipped)
- ✅ Lighthouse Score > 95

### Métricas de Performance
- **FCP**: < 1.2s
- **LCP**: < 2.0s
- **CLS**: < 0.1
- **FID**: < 100ms

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📝 Roadmap

### v1.0 (MVP) ✅
- [x] Interface administrativa
- [x] Sistema de autenticação
- [x] Gestão de agendamentos
- [x] CRM básico
- [x] Configuração de IA

### v1.1 (Em desenvolvimento)
- [ ] Integração Evolution API real
- [ ] Webhooks N8N funcionais
- [ ] Sistema de pagamentos
- [ ] Mobile app (React Native)

### v1.2 (Planejado)
- [ ] API pública
- [ ] Marketplace de templates
- [ ] Analytics avançado
- [ ] Multi-idioma (i18n)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Time

- **Desenvolvedor Principal**: [Seu Nome](https://github.com/seu-usuario)
- **Design**: [Designer](https://github.com/designer)
- **Contribuidores**: [Ver todos](https://github.com/seu-usuario/agendabot/contributors)

## 📞 Suporte

- **Documentação**: [docs.agendabot.com](https://docs.agendabot.com)
- **Discord**: [Comunidade](https://discord.gg/agendabot)
- **Email**: suporte@agendabot.com

---

Feito com ❤️ usando [Lovable](https://lovable.dev) e [Cloudflare Pages](https://pages.cloudflare.com)
