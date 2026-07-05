# PetFinder Web

Frontend do PetFinder: cadastro e login de usuários, mapa para marcar/visualizar pets perdidos e página de perfil.

## Stack

- React 18 + TypeScript
- Vite
- Panda CSS
- React Router v6
- react-leaflet v4 (mapas)
- @unform (formulários)
- Vitest + Testing Library (testes)

## Setup

1. Copie `.env.example` para `.env` e ajuste `VITE_API_URL` para apontar para o backend (`petfinder-backend`).
2. `yarn install`
3. `yarn dev` — inicia o servidor de desenvolvimento (Vite) em `http://localhost:3000`.

O backend (`petfinder-backend`) precisa estar rodando para login, cadastro e as demais funcionalidades.

## Scripts

- `yarn dev` — servidor de desenvolvimento.
- `yarn build` — typecheck (`tsc --noEmit`) + build de produção (`vite build`), gera `dist/`.
- `yarn preview` — serve o build de produção localmente.
- `yarn test` — roda a suíte de testes (Vitest + Testing Library).

## Histórico

Projeto migrado de Create React App (react-scripts) + styled-components para Vite + Panda CSS, com atualização para React 18, React Router v6, react-leaflet v4 e hardening de dependências/segurança (URL da API via variável de ambiente, remoção de dependências não utilizadas ou desatualizadas).
