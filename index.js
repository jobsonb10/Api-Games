// importação do express, mongoose e das rotas
const express = require("express");
const mongoose = require("./database");
const routes = require("./routes");

//declaração de variaveis e do nossa aplicação
const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
