const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/agendamentos", (req, res) => {
  res.json([
    { id: 1, cliente: "João", data: "2026-04-01", hora: "10:00" },
    { id: 2, cliente: "Maria", data: "2026-04-02", hora: "14:00" }
  ]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando...");
});
