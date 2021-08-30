const express = require("express");
const routes = express.Router();
const JogoSchema = require("./models/jogo");
const mongoose = require("./database");
const Jogo = require("./models/jogo");

//rota home
routes.get("/", (req, res) => {
  res.send({ info: "Hello World!" });
});

//rota GetAllJogos
routes.get("/jogos", async (req, res) => {
  const jogos = await JogoSchema.find();
  res.send({ jogos });
});

//rota GetJogosById
routes.get("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Id invádo" });
    return;
  }

  const jogo = await JogoSchema.findById(id);

  if (!jogo) {
    res.status(404).send({ error: "Jogo não Encontrado!" });
    return;
  }

  res.send({ jogo });
});

//rota AddJogos
routes.post("/jogos", async (req, res) => {
  const jogo = req.body;

  if (!jogo || !jogo.nome || !jogo.imagem) {
    res.status(400).send({ error: "Filme incompleto!" });
    return;
  }

  const novoJogo = await new JogoSchema(jogo).save();

  res.status(201).send({ novoJogo });
});

//rota Updatejogo
routes.put("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Id invádo" });
    return;
  }

  const jogo = await JogoSchema.findById(id);

  if (!jogo) {
    res.status(404).send({ error: "Jogo não Encontrado!" });
    return;
  }

  const novoJogo = req.body;

  if (!novoJogo || !novoJogo.nome || !novoJogo.imagem) {
    res.status(400).send({ error: "Filme inválido!" });
    return;
  }

  await JogoSchema.findOneAndUpdate({ _id: id }, novoJogo);
  const jogoAtualizado = await JogoSchema.findById(id);

  res.send({ jogoAtualizado });
});

//rota DeleteGame
routes.delete("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Id inválido" });
    return;
  }

  const jogo = await JogoSchema.findById(id);

  if (!jogo) {
    res.status(404).send({ error: "Jogo não encontrado" });
    return;
  }

  await JogoSchema.findByIdAndDelete(id);

  res.send({ message: "Filme excluído com sucesso!" });
});

module.exports = routes;
