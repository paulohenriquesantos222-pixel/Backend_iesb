# CRUD de Livros API

Este projeto é uma API REST para gerenciar um CRUD de livros, desenvolvida com Node.js, Express, MongoDB Atlas, Mongoose e validações utilizando Yup.

## Estrutura do Projeto

```
crud-livros
├── src
│   ├── index.js               # Ponto de entrada da aplicação
│   ├── models
│   │   └── Livro.js           # Modelo do livro
│   ├── controllers
│   │   └── LivroController.js  # Lógica do CRUD para livros
│   └── validators
│       ├── LivroValidator.js   # Validações dos dados do livro
│       └── IDValidator.js      # Validação de ID
├── .env                        # Variáveis de ambiente
├── .gitignore                  # Arquivos a serem ignorados pelo Git
├── package.json                # Configurações do projeto
└── README.md                   # Documentação do projeto
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd crud-livros
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais do MongoDB:
   ```
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   DB_HOST=seu_host
   DB_NAME=nome_do_banco
   ```

## Uso

1. Inicie o servidor:
   ```
   npm start
   ```

2. A API estará disponível em `http://localhost:3000`.

## Endpoints

- **POST /livros**: Cria um novo livro.
- **GET /livros**: Lista todos os livros.
- **GET /livros/:id**: Busca um livro pelo ID.
- **PUT /livros/:id**: Atualiza um livro existente.
- **DELETE /livros/:id**: Remove um livro pelo ID.

## Validações

As validações são realizadas utilizando Yup, garantindo que os dados enviados nas requisições estejam corretos e completos.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Faça um fork do repositório e envie suas alterações.

## Licença

Este projeto é de uso livre.