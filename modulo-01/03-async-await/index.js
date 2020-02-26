/*  
0 - Obter o usuário
1 - Obter o telefone de um usuário a partir do seu id
2 - Obter o endereço de um usuário a partir do seu id
*/

// importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      //return reject(new Error('deu ruim de verdade'))
      return resolve({
        id: 1,
        nome: 'Mateus',
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        telefone: '000-000-000',
        ddd: 19
      })
    }, 2000)
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Paulista',
      numero: 75
    })
  }, 2000)
}

// Promises - Async / await 
// 1- Adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
  try {
    console.time(`medida-promise`)
    const usuario = await obterUsuario()
    //const telefone = await obterTelefone(usuario.id)
    //const endereco = await obterEnderecoAsync(usuario.id)
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const telefone = resultado[0]
    const endereco = resultado[1]

    console.log(`
      Nome: ${usuario.nome},
      Telefone: (${telefone.ddd}) ${telefone.telefone},
      Endereço: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd(`medida-promise`)
  }
  catch (error) {
    console.error('Deu ruim', error)
  }
}
