# Simulador de Investimento - Backend API

Backend API para sistema de simulação de investimentos.

## Tecnologias

- Node.js
- TypeScript
- Express.js
- Zod (validação)

## Estrutura do Projeto

```
src/
├── api/                    # Controllers da API
│   └── v1/                 # Versão 1 da API
│       ├── internal/       # Endpoints autenticados
│       └── external/       # Endpoints públicos
├── routes/                 # Definições de rotas
├── middleware/             # Middlewares Express
├── services/               # Lógica de negócio
├── utils/                  # Funções utilitárias
├── constants/              # Constantes da aplicação
├── instances/              # Configurações e instâncias
└── server.ts               # Ponto de entrada
```

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Produção

```bash
npm start
```

## Testes

```bash
npm test
```

## Lint

```bash
npm run lint
npm run lint:fix
```

## Endpoints

### Health Check

```
GET /health
```

### API v1

Todos os endpoints da API estão sob `/api/v1`:

- `/api/v1/external/*` - Endpoints públicos
- `/api/v1/internal/*` - Endpoints autenticados

## Padrões de Resposta

### Sucesso

```json
{
  "success": true,
  "data": {},
  "metadata": {
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### Erro

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {}
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```