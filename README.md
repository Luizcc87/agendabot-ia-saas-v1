
# Agendabot IA SaaS v1

Plataforma SaaS para gestão de agentes de IA integrados ao WhatsApp, com histórico de conversas, múltiplos usuários, permissões e integração com Supabase e N8N.

## Funcionalidades
- Multi-tenant (várias empresas/organizações)
- Controle de usuários e permissões (admin, operador, superadmin)
- Histórico de conversas do WhatsApp
- Integração com IA (RAG)
- Integração com N8N para automações
- Painel administrativo

## Tecnologias
- React + TypeScript
- Supabase (PostgreSQL, Auth, Storage)
- N8N (integração via webhooks)
- Cloudflare Pages (deploy)

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/SEU_USUARIO/agendabot-ia-saas-v1.git
   cd agendabot-ia-saas-v1
   ```

2. **Instale as dependências:**
   ```sh
   yarn install
   # ou
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz com:
   ```env
   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<sua-anon-key>
   ```
   > As chaves estão disponíveis no painel do Supabase em Project Settings > API.

4. **Desenvolvimento local:**
   ```sh
   yarn dev
   # ou
   npm run dev
   ```

5. **Build para produção:**
   ```sh
   yarn build
   # ou
   npm run build
   ```

6. **Deploy no Cloudflare Pages:**
   - Configure o projeto no painel do Cloudflare Pages.
   - Defina as variáveis de ambiente no painel do Cloudflare.
   - O comando de build é `yarn build` e o diretório de saída é `dist`.

## Estrutura de Pastas
- `src/` - Código-fonte principal
- `public/` - Arquivos estáticos
- `docs/` - Documentação

## Licença
MIT. Veja o arquivo [LICENSE](LICENSE).

## Contato
Dúvidas ou sugestões? Abra uma issue ou envie um e-mail para contato@l2csolucoes.com.br
