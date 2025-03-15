# Knex.js CRUD

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **Knex.js** (Query Builder para SQL)
- **MySQL**

## 📌 Pré-requisitos
Antes de começar, certifique-se de ter:
- Node.js instalado
- MySQL instalado e configurado
- Um banco de dados criado no MySQL

## 📦 Configuração do Banco de Dados
No arquivo `database.js`, configure a conexão com o seu banco MySQL:

```javascript
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'SUA_SENHA',
        database: 'knexjs'
    }
});

module.exports = knex;
```

## ⚙️ Como Usar
### 1️⃣ Instalar Dependências
```sh
npm install
```

### 2️⃣ Criar a Tabela `games`
Execute no MySQL Workbench ou no terminal:
```sql
CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);
```

### 3️⃣ Executar as Operações CRUD
#### 🔹 Inserir Dados (Evita Duplicatas)
```javascript
async function inserirJogo(nome, preco) {
    const existe = await database('games').where({ nome }).first();
    if (existe) {
        console.log('Jogo já existe no banco!');
    } else {
        await database('games').insert({ nome, preco });
        console.log('Jogo inserido com sucesso!');
    }
}
```

#### 🔹 Listar Jogos
```javascript
async function listarJogos() {
    const jogos = await database('games').select();
    console.log(jogos);
}
```

#### 🔹 Atualizar Preço de um Jogo
```javascript
async function atualizarPreco(id, novoPreco) {
    await database('games').where({ id }).update({ preco: novoPreco });
    console.log('Preço atualizado!');
}
```

#### 🔹 Deletar um Jogo
```javascript
async function deletarJogo(id) {
    await database('games').where({ id }).del();
    console.log('Jogo deletado!');
}
```

#### 🔹 Deletar Todos os Jogos (Com Transação ACID)
```javascript
async function deletarTodosOsJogos() {
    await database.transaction(async (trx) => {
        await trx('games').del();
        console.log('Todos os jogos foram removidos!');
    });
}
```

## 📜 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo.

## 📞 Contato
 [GitHub](https://github.com/Benevanio)

