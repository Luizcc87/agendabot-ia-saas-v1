
# Guia de Deploy Completo

## Cloudflare Pages - Configuração Avançada

### Build Configuration

```yaml
# wrangler.toml
name = "agendabot"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"
cwd = "."
watch_dir = "src"

[build.upload]
format = "modules"
dir = "dist"
main = "./index.js"

[[build.upload.rules]]
type = "ESModule"
globs = ["**/*.js"]
fallthrough = true
```

### Environment Variables

#### Via Dashboard
```bash
# Acesse Cloudflare Pages > Settings > Environment variables
VITE_SUPABASE_URL=https://projeto.supabase.co
VITE_SUPABASE_ANON_KEY=chave_publica
VITE_APP_URL=https://agendabot.pages.dev
```

#### Via Wrangler CLI
```bash
wrangler pages secret put VITE_SUPABASE_URL
wrangler pages secret put VITE_SUPABASE_ANON_KEY
```

### Headers Customizados

```toml
# public/_headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.png
/*.jpg
/*.jpeg
/*.webp
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate
```

### Redirects e Rewrites

```toml
# public/_redirects
# SPA routing
/*    /index.html   200

# API redirects (opcional)
/api/*  https://api.supabase.co/:splat  200

# Redirect para HTTPS
http://agendabot.pages.dev/*  https://agendabot.pages.dev/:splat  301!

# Domínio customizado
http://www.seudominio.com/*  https://seudominio.com/:splat  301!
```

## GitHub Actions (CI/CD)

### Workflow Principal

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Type check
        run: npm run type-check
        
      - name: Lint
        run: npm run lint
        
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: agendabot
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

## Supabase Setup

### Configuração Inicial

```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policies de exemplo
CREATE POLICY "Users can only see their company data" ON companies
  FOR ALL USING (auth.uid() IN (
    SELECT user_id FROM users WHERE company_id = id
  ));
```

### Migrations

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Linkar projeto
supabase link --project-ref SEU_PROJECT_REF

# Aplicar migrations
supabase db push
```

## Domínio Customizado

### DNS Configuration

```bash
# Adicione estes registros no seu provedor DNS:
CNAME   www      agendabot.pages.dev
CNAME   @        agendabot.pages.dev

# Ou para apex domain:
A       @        192.0.2.1  # IP do Cloudflare
AAAA    @        2001:db8::1
```

### SSL Certificate

```bash
# Cloudflare gerencia automaticamente
# Certificado válido em ~15 minutos
# Renovação automática
```

## Monitoramento

### Analytics Setup

```javascript
// src/lib/analytics.ts
export const trackEvent = (event: string, properties?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, properties);
  }
};
```

### Error Tracking

```bash
# Instalar Sentry (opcional)
npm install @sentry/react @sentry/tracing

# Configurar em src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

## Troubleshooting

### Build Errors

```bash
# Limpar cache
npm run clean
rm -rf node_modules
npm install

# Verificar tipos
npm run type-check

# Build local
npm run build
npm run preview
```

### Deploy Issues

```bash
# Verificar logs
wrangler pages deployment list
wrangler pages deployment tail

# Forçar novo deploy
wrangler pages publish dist --project-name=agendabot --compatibility-date=2024-01-01
```

### Performance Issues

```bash
# Analisar bundle
npm run build
npx vite-bundle-analyzer dist

# Verificar Core Web Vitals
# https://pagespeed.web.dev/
```

## Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Build passando sem erros
- [ ] Testes passando (quando implementados)
- [ ] Headers de segurança configurados
- [ ] Redirects funcionando
- [ ] SSL certificate ativo
- [ ] DNS configurado corretamente
- [ ] Analytics funcionando
- [ ] Error tracking ativo
- [ ] Performance metrics > 90
