# Projeto PetFinder em Produção :construction:

## Descrição do projeto :star:

Uma plataforma baseada na plataforma [Happy](https://github.com/rocketseat-education/nlw-03-omnistack) da semana **Next Level Week#3** da [Rocketseat](https://www.rocketseat.com.br).

A ideia é fazer uma nova versão  em React.js do meu trabalho de conclução de curso apresentado em 2019 na Fatec-Jales, se baseando no projeto Happy. 👩‍💻


## Validação de imagens com IA :robot:

Ao cadastrar ou editar um pet, as fotos enviadas passam por uma verificação automática usando a API do Gemini (Google): se alguma imagem não parecer ser de um animal, o upload é rejeitado antes de ser salvo.

## Como rodar a aplicação :arrow_forward:

Em caso de download do projeto você precisará baixar as dependências :warning: :heavy_exclamation_mark:

**Necessário:** Yarn ou NPM

### Executando o projeto com **Yarn**:

- Backend (pasta `petfinder-backend`):

```
cd petfinder-backend
yarn
yarn dev
```

- Frontend (pasta `petfinder-web`): copie `.env.example` para `.env` (ajustando `VITE_API_URL` se necessário) e execute:

```
cd petfinder-web
yarn
yarn dev
```

O frontend sobe em `http://localhost:3000` e depende do backend rodando em `http://localhost:3333`.

## Web 

---

## Capturas de tela :camera:

<img width="100%" alt="login" src="https://github.com/thaislsilveira/PetFinder-React/blob/main/images/login.png">
<img width="100%" alt="dashboard" src="https://github.com/thaislsilveira/PetFinder-React/blob/main/images/dashboard.png">
<img width="100%" alt="cadastrando" src="https://github.com/thaislsilveira/PetFinder-React/blob/main/images/cadastrando.png">
<img width="100%" alt="cadastro" src="https://github.com/thaislsilveira/PetFinder-React/blob/main/images/cadastro.png">
<img width="100%" alt="botão sair" src="https://github.com/thaislsilveira/PetFinder-React/blob/main/images/petfinder-sair.png">
<img width="100%" alt="perfil" src="https://github.com/thaislsilveira/PetFinder-React/blob/main/images/petfinder-profile.png">
<img width="100%" alt="perfil do pet com selo de encontrado" src="https://github.com/thaislsilveira/PetFinder-React/blob/main/images/pet-encontrado.png">
<img width="100%" alt="edição do pet, com opção de marcar como encontrado e remover fotos" src="https://github.com/thaislsilveira/PetFinder-React/blob/main/images/editar-pet.png">
<img width="100%" alt="mapa com pin verde e data de quando o pet foi encontrado" src="https://github.com/thaislsilveira/PetFinder-React/blob/main/images/mapa-encontrado.png">


## Tecnologias utilizadas 🚀

<ul>
   <li><a href="https://reactjs.org/" target="_blank">React</a></li>
   <li><a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a></li>  
   <li><a href="https://vitejs.dev/" target="_blank">Vite</a></li>
   <li><a href="https://www.sqlite.org/index.html" target="_blank">SQLite</a></li> 
   <li><a href="https://panda-css.com/" target="_blank">Panda CSS</a></li>
   <li><a href="https://eslint.org/" target="_blank">Eslint</a></li>
   <li><a href="https://prettier.io/" target="_blank">Prettier</a></li>
   <li><a href="https://react-leaflet.js.org/" target="_blank">React Leaflet</a></li>
   <li><a href="https://react-icons.github.io/react-icons/" target="_blank">React Icons</a></li>
   <li><a href="https://date-fns.org/" target="_blank">Date-fns</a></li>
   <li><a href="https://ai.google.dev/" target="_blank">Google Gemini API</a></li>
</ul>
