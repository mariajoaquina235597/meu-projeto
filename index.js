const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

const EVOLUTION_URL = 'https://evolution-api-production-2ec0.up.railway.app';
const EVOLUTION_KEY = 'a10569129facb78ccf7e179ad917475733e9253ab20f509818a8b02ab124b170';
const INSTANCIA = 'Profissional de Barbearia';

async function enviarMensagem(phone, mensagem) {
  try {
    const response = await fetch(`${EVOLUTION_URL}/message/sendText/${INSTANCIA}`, {
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
    const data = await response.json();
    console.log('Resposta Evolution:', JSON.stringify(data));
  } catch(err) {
    console.log('Erro ao enviar:', err.message);
  }
}

app.get('/', (req, res) => {
  res.send('API Barbearia funcionando!');
});

app.post('/webhook', async (req, res) => {
  console.log('Webhook recebido:', JSON.stringify(req.body));
  
  const body = req.body;
  const phone = body?.data?.key?.remoteJid;
  const fromMe = body?.data?.key?.fromMe;
  const event = body?.event;

  console.log('Event:', event, 'Phone:', phone, 'FromMe:', fromMe);

  if (phone && !fromMe && event === 'messages.upsert') {
    await enviarMensagem(phone,
      `Olá! 😊 Seja bem-vindo à *BarberPro*! ✂️\n\nPara agendar acesse:\n👉 https://glittery-raindrop-83460e.netlify.app`
    );
  }

  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
