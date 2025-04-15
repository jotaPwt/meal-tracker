const express = require('express');

function criarRefeicaoRoutes(modeloRefeicao) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const refeicoes = await modeloRefeicao.listar();
    res.json(refeicoes);
  });

  router.post('/', async (req, res) => {
    const novaRefeicao = req.body;
    const resultado = await modeloRefeicao.adicionar(novaRefeicao);
    res.status(201).json(resultado);
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const resultado = await modeloRefeicao.removerPorId(id);
    res.json(resultado);
  });

  const { ObjectId } = require('mongodb');

  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
      const resultado = await modeloRefeicao.atualizarPorId(id, dadosAtualizados);

      if (resultado.matchedCount === 0) {
        return res.status(404).json({ error: "Refeição não encontrada." });
      }

      res.json({ message: "Refeição atualizada com sucesso." });

    } catch (err) {
      console.error("Erro ao atualizar refeição:", err);
      res.status(500).json({ error: "Erro ao atualizar refeição." });
    }
  });


  return router;

  
}

module.exports = criarRefeicaoRoutes;
