const express = require('express');
const router = express.Router();
const redisClient = require('../config/redis.config');
const openaiClient = require('../config/openai.config');
const { systemPrompt } = require('../prompts/system.prompt');
const { sendMessage } = require('../services/evolution');

/// Redis Functions
const setMemory = async (memory) => {
  await redisClient.set('memory', JSON.stringify(memory));
};

const getMemory = async () => {
  const memory = await redisClient.get('memory');
  return memory ? JSON.parse(memory) : null;
};

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      status: 'error',
      message: 'Message is required',
    });
  }

  try {
    // 1️⃣ Busca o histórico salvo no Redis (ou cria novo)
    let memory = await getMemory();
    if (!memory) {
      memory = [
        {
          role: 'system',
          content: systemPrompt,
        },
      ];
    }

    // 2️⃣ Adiciona a nova mensagem do usuário ao histórico
    memory.push({ role: 'user', content: message });

    // 3️⃣ Gera a resposta com base no histórico completo
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: memory,
    });

    const assistantReply = response.choices[0].message.content;

    // 4️⃣ Adiciona a resposta do assistente ao histórico
    memory.push({ role: 'assistant', content: assistantReply });

    // 5️⃣ Atualiza o histórico no Redis
    await setMemory(memory);

    sendMessage({
      phoneNumber: '5531997153507',
      message: assistantReply,
    });

    // 6️⃣ Retorna a resposta
    res.json({
      status: 'success',
      message: assistantReply,
    });


  } catch (error) {
    console.error('Erro no chat:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate response',
    });
  }
});


module.exports = router;
