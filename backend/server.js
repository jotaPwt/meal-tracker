
const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
const criarModeloRefeicao = require('./models/refeicaoModel.js');
const criarRefeicaoRoutes = require('./routes/refeicaoRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

const uri = "mongodb+srv://wiltenburgjoao:jotaP.09@cluster0.eb3wplv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

async function start() {
  try {
    await client.connect();
    const db = client.db("meuBanco");
    const modeloRefeicao = criarModeloRefeicao(db);

    app.use('/refeicoes', criarRefeicaoRoutes(modeloRefeicao));

    app.listen(3000, () => {
      console.log("🚀 Servidor rodando na porta 3000");
    });

  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
  }
}




start();
