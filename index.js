const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

const EVOLUTION_URL = 'https://evolution-api-production-2ec0.up.railway.app';
const EVOLUTION_KEY = 'a10569129facb78ccf7e179ad917475733e9253ab20f509818a8b02ab124b170';
const INSTANCIA = 'Profissional de Barbearia';
const BARBEIRO_PHONE = '5511999805125';

async function enviarMensagem(phone, mensagem) {
  await fetch(`${EVOLUTION_URL}/message/sendText/${INSTANCIA}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': EVOLUTION_KEY
    },
    body: JSON.stringify({
      number: phone,
      text: mensagem
    })
  });
}

app.get('/', (req, res) => {
  res.send('API Barbearia funcionando!');
});

app.post('/webhook', async (req, res) => {
  const body = req.body;
  const phone = body?.data?.key?.remoteJid || '';
  const fromMe = body?.data?.key?.fromMe || false;

  if (!fromMe && phone) {
    await enviarMensagem(phone,
      `Olá! 😊 Seja bem-vindo à *BarberPro - Barbearia Premium*! ✂️\n\nPara agendar seu horário acesse nosso app:\n👉 https://glittery-raindrop-83460e.netlify.app\n\nEscolha o serviço, barbeiro, data e horário. Confirmação automática! 🗓️`
    );
  }

  res.status(200).json({ status: 'ok' });
});

app.post('/confirmar', async (req, res) => {
  const { clientePhone, clienteNome, servico, data, hora, preco } = req.body;

  const msgCliente = `✅ *Agendamento Confirmado — BarberPro!*\n\nOlá, ${clienteNome}! Seu horário está confirmado. ✂️\n\n📅 ${data}\n🕐 ${hora}\n💈 ${servico}\n💰 R$ ${preco}\n\nAté lá!`;

  const msgBarbeiro = `🔔 *Novo Agendamento!*\n\nCliente: ${clienteNome}\n📅 ${data}\n🕐 ${hora}\n💈 ${servico}\n💰 R$ ${preco}\n📱 ${clientePhone}`;

  await enviarMensagem(clientePhone, msgCliente);
  await enviarMensagem(BARBEIRO_PHONE, msgBarbeiro);

  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
