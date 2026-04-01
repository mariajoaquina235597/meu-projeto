 const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

const EVOLUTION_URL = 'https://evolution-api-production-2ec0.up.railway.app';
const EVOLUTION_KEY = 'a10569129facb78ccf7e179ad917475733e9253ab20f509818a8b02ab124b170';
const INSTANCIA = 'Profissional de Barbearia';
const BARBEIRO_PHONE = '5511999805125';

async function enviarMensagem(phone, mensagem) {
  try {
    const response = await fetch(`${EVOLUTION_URL}/message/sendText/${encodeURIComponent(INSTANCIA)}`, {
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
  console.log('WEBHOOK:', JSON.stringify(req.body));
  
  try {
    const body = req.body;
    const phone = body?.data?.key?.remoteJid || 
                  body?.key?.remoteJid || 
                  body?.remoteJid;
    const fromMe = body?.data?.key?.fromMe || 
                   body?.key?.fromMe || false;

    if (phone && !fromMe) {
      await enviarMensagem(phone,
        `Olá! 😊 Seja bem-vindo à *BarberPro*! ✂️\n\nPara agendar acesse:\n👉 https://glittery-raindrop-83460e.netlify.app`
      );
    }
  } catch(err) {
    console.log('Erro webhook:', err.message);
  }

  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
