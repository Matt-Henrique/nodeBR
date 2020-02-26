/*  
0 - Obter o usuário
1 - Obter o telefone de um usuário a partir do seu id
2 - Obter o endereço de um usuário a partir do seu id
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: 'Mateus',
      dataNascimento: new Date()
    })
  }, 1000)
}

function obterTelefone(idUsuario, callback) {
  setTimeout(function () {
    return callback(null, {
      telefone: '000-000-000',
      ddd: 19
    })
  }, 2000)
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Paulista',
      numero: 75
    })
  }, 2000)
}

function resolverUsuario(erro, usuario) {
  console.log('usuário: ', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error('Deu ruim no usuário', error)
    return;
  }

  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error('Deu ruim no telefone', error1)
      return;
    }

    obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
      if (erro2) {
        console.error('Deu ruim no endereço', error2)
        return;
      }

      console.log(`
        Nome: ${usuario.nome}
        Endereço: ${endereco.rua}, ${endereco.numero}
        Telefone: (${telefone.ddd}) ${telefone.telefone}
      `)
    })
  })
})
