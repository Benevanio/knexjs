const database = require('./database');

const dados = [
    { nome: 'Batman Arkham Knight', preco: 120.0 },
    { nome: 'Mortal Kombat XL', preco: 80.0 },
    { nome: 'Call Of Duty Infinite Warfare', preco: 190.0 },
];

async function inserirJogos() {
    try {
        await database.transaction(async (trx) => {
            for (const jogo of dados) {
                const existe = await trx('games')
                    .where({ nome: jogo.nome })
                    .first();

                if (existe) {
                    console.log(`Jogo "${jogo.nome}" já existe. Atualizando o preço.`);
                    await trx('games')
                        .where({ nome: jogo.nome })
                        .update({ preco: jogo.preco });
                } else {
                    await trx('games').insert(jogo);
                    console.log(`Jogo "${jogo.nome}" inserido com sucesso!`);
                }
            }
        });
    } catch (err) {
        console.error('Erro ao processar jogos:', err);
    } finally {
        database.destroy();
    }
}

async function listarJogos() {
    try {
        const jogos = await database('games').select();
        console.log('Lista de jogos:', jogos);
    } catch (err) {
        console.error('Erro ao listar jogos:', err);
    } finally {
        database.destroy();
    }
}

async function buscarJogoPorId(id) {
    try {
        const jogo = await database('games').where({ id }).first();
        console.log(`Jogo encontrado:`, jogo);
    } catch (err) {
        console.error('Erro ao buscar jogo:', err);
    } finally {
        database.destroy();
    }
}

async function atualizarPreco(id, novoPreco) {
    try {
        await database.transaction(async (trx) => {
            await trx('games').where({ id }).update({ preco: novoPreco });
            console.log(`Preço do jogo ID ${id} atualizado para R$${novoPreco}`);
        });
    } catch (err) {
        console.error('Erro ao atualizar preço:', err);
    } finally {
        database.destroy();
    }
}

async function deletarJogo(id) {
    try {
        await database.transaction(async (trx) => {
            await trx('games').where({ id }).del();
            console.log(`Jogo ID ${id} deletado com sucesso!`);
        });
    } catch (err) {
        console.error('Erro ao deletar jogo:', err);
    } finally {
        database.destroy();
    }
}

inserirJogos();
listarJogos();
buscarJogoPorId(36);
atualizarPreco(2, 90.0);
deletarJogo(38);
listarJogos();