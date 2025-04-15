function criarModeloRefeicao(db) {
    const collection = db.collection('refeicoes');
  
    return {
      async listar() {
        return await collection.find().toArray();
      },
      async adicionar(refeicao) {
        return await collection.insertOne(refeicao);
      },
      async removerPorId(id) {
        const { ObjectId } = require('mongodb');
        return await collection.deleteOne({ _id: new ObjectId(id) });
      }
    };
  }
  
  module.exports = criarModeloRefeicao;
  


  const { ObjectId } = require('mongodb');

  function criarModeloRefeicao(db) {
    const collection = db.collection('refeicoes');
  
    return {
      async listar() {
        return await collection.find().toArray();
      },
  
      async adicionar(refeicao) {
        return await collection.insertOne(refeicao);
      },
  
      async removerPorId(id) {
        return await collection.deleteOne({ _id: new ObjectId(id) });
      },
  
      async atualizarPorId(id, dadosAtualizados) {
        return await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: dadosAtualizados }
        );
      }
    };
  }
  
  module.exports = criarModeloRefeicao;
  