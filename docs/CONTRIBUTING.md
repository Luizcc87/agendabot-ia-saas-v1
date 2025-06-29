
# Guia de Contribuição

## Bem-vindo!

Obrigado pelo interesse em contribuir com o AgendaBot! Este guia irá ajudá-lo a começar.

## Setup do Ambiente

### Pré-requisitos
- Node.js 18+
- npm 9+
- Git
- Editor com TypeScript support (recomendado: VS Code)

### Configuração Inicial

```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/SEU_USUARIO/agendabot.git
cd agendabot

# 3. Adicione o repositório original como upstream
git remote add upstream https://github.com/ORIGINAL_USUARIO/agendabot.git

# 4. Instale dependências
npm install

# 5. Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# 6. Execute em desenvolvimento
npm run dev
```

### Estrutura de Branches

```bash
# Branch principal
main              # Produção

# Branches de feature
feature/nome-da-feature
fix/nome-do-bug
docs/atualizacao-doc
refactor/melhoria-codigo
```

## Padrões de Código

### Commits Convencionais

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Tipos principais
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
style:    Formatação (não afeta lógica)
refactor: Refatoração de código
test:     Adição/correção de testes
chore:    Tarefas de manutenção

# Exemplos
feat: add WhatsApp integration
fix: resolve authentication redirect issue
docs: update deployment guide
style: format code with prettier
refactor: extract reusable components
test: add unit tests for user service
chore: update dependencies
```

### Nomenclatura

```typescript
// Componentes: PascalCase
const UserProfile = () => { ... }

// Funções: camelCase
const fetchUserData = () => { ... }

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'

// Interfaces: PascalCase com 'I' prefix (opcional)
interface IUser {
  id: string
  name: string
}

// Types: PascalCase
type UserRole = 'admin' | 'user' | 'viewer'
```

### Estrutura de Arquivos

```typescript
// Componente padrão
// src/components/UserProfile/index.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserProfileProps } from './types'
import './styles.css'

export const UserProfile = ({ user }: UserProfileProps) => {
  // Component logic
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// Sempre exportar como default também
export default UserProfile
```

### TypeScript

```typescript
// Use interfaces para objetos
interface User {
  id: string
  name: string
  email: string
}

// Use types para primitivos e uniões
type Status = 'loading' | 'success' | 'error'

// Props sempre tipadas
interface ComponentProps {
  title: string
  isVisible?: boolean
  onClose: () => void
}

// Evite 'any', use 'unknown' quando necessário
const processData = (data: unknown) => {
  // Type guards
  if (typeof data === 'string') {
    return data.toUpperCase()
  }
}
```

## Pull Requests

### Antes de Abrir um PR

```bash
# 1. Atualize sua branch com upstream
git checkout main
git pull upstream main
git checkout feature/sua-feature
git rebase main

# 2. Execute os checks
npm run lint
npm run type-check
npm run build

# 3. Teste localmente
npm run dev
# Teste manual das funcionalidades
```

### Template de PR

```markdown
## Descrição
Breve descrição das mudanças implementadas.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Execute `npm run dev`
2. Acesse `/admin/dashboard`
3. Verifique se...

## Screenshots
(se aplicável)

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Build sem warnings
```

## Desenvolvimento

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev           # Dev server
npm run build         # Build de produção
npm run preview       # Preview do build

# Qualidade
npm run lint          # ESLint
npm run lint:fix      # Fix automático
npm run type-check    # TypeScript check
npm run format        # Prettier

# Testes (quando implementados)
npm run test          # Unit tests
npm run test:watch    # Watch mode
npm run test:coverage # Relatório de cobertura
```

### Debug

```typescript
// Use console.log temporariamente (será removido no build)
console.log('Debug info:', data)

// Para logs persistentes, use uma lib de logging
import { logger } from '@/lib/logger'
logger.info('User action', { userId, action })
```

### Performance

```typescript
// Lazy load de componentes pesados
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Memoização para cálculos custosos
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data)
}, [data])

// Callbacks estáveis
const handleClick = useCallback(() => {
  // handler logic
}, [dependency])
```

## Testes

### Estrutura

```typescript
// src/components/Button/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../index'

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Documentação

### JSDoc

```typescript
/**
 * Fetches user data from the API
 * @param userId - The unique identifier for the user
 * @param options - Optional request configuration
 * @returns Promise resolving to user data
 * @throws {Error} When user is not found
 * 
 * @example
 * ```typescript
 * const user = await fetchUser('123')
 * console.log(user.name)
 * ```
 */
const fetchUser = async (
  userId: string,
  options?: RequestOptions
): Promise<User> => {
  // Implementation
}
```

### README de Componentes

```markdown
# UserProfile Component

Displays user information with edit capabilities.

## Usage

```tsx
<UserProfile 
  user={user}
  onEdit={handleEdit}
  isEditable
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| user | User | - | User object to display |
| onEdit | Function | - | Callback for edit action |
| isEditable | boolean | false | Whether user can edit |
```

## Processo de Review

### Como Reviewer

1. **Funcionalidade**: A feature funciona como esperado?
2. **Código**: Segue os padrões? Está limpo?
3. **Performance**: Não introduce regressões?
4. **Segurança**: Não expose dados sensíveis?
5. **UX**: A interface está intuitiva?

### Feedback Construtivo

```markdown
# ✅ Bom
"Sugiro extrair essa lógica para um hook customizado para melhor reusabilidade."

# ❌ Ruim  
"Esse código está ruim."
```

## Recursos Úteis

### Extensões VS Code Recomendadas

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag"
  ]
}
```

### Links Úteis

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase Docs](https://supabase.com/docs)

## Comunidade

- **Discord**: [Link da comunidade]
- **Issues**: Para bugs e feature requests
- **Discussions**: Para perguntas e ideias

## Reconhecimento

Contribuidores são reconhecidos:
- README principal
- Página de créditos
- Release notes
- Hall of Fame (planejado)

Obrigado por contribuir! 🚀
