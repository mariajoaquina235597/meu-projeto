  const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Barbearia funcionando!');
});

app.post('/webhook', (req, res) => {
  const body = req.body;
  const message = body?.data?.message?.conversation || '';
  const phone = body?.data?.key?.remoteJid || '';

  console.log('Mensagem recebida:', message, 'de:', phone);
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
