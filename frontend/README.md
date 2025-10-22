# Simulador de Investimento

Sistema que permite ao usuário calcular projeções de investimentos inserindo valor inicial, aporte mensal, taxa de juros e prazo.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Provedores globais
│   └── router.tsx         # Configuração de rotas
├── pages/                 # Páginas da aplicação
│   ├── Home/             # Página inicial
│   └── layouts/          # Layouts compartilhados
├── core/                  # Componentes e utilitários globais
│   ├── components/       # Componentes reutilizáveis
│   ├── lib/              # Configurações de bibliotecas
│   ├── utils/            # Funções utilitárias
│   └── types/            # Tipos TypeScript globais
├── domain/               # Domínios de negócio (a implementar)
└── assets/               # Recursos estáticos
    └── styles/           # Estilos globais
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

## Configuração

1. Copie `.env.example` para `.env`
2. Configure as variáveis de ambiente:
   - `VITE_API_URL`: URL da API backend
   - `VITE_API_VERSION`: Versão da API (padrão: v1)
   - `VITE_API_TIMEOUT`: Timeout das requisições (padrão: 30000ms)

## Desenvolvimento

O projeto está estruturado seguindo os princípios de:
- Arquitetura baseada em domínios
- Separação de responsabilidades
- Componentes reutilizáveis
- Type-safety com TypeScript
- Padrões de código consistentes

## Próximos Passos

1. Implementar domínio de investimento
2. Criar componentes de formulário de simulação
3. Implementar cálculos de juros compostos
4. Adicionar visualização de resultados
5. Implementar validações de entrada