const express = require('express');
const router = express.Router();
const openaiClient = require('../config/openai.config');
const { systemPrompt } = require('../prompts/system.prompt');
const { sendMessage } = require('../services/evolution');
const { salvarMemoria, obterMemoria } = require('../services/memory');

// Funções auxiliares
const inicializarMemoria = () => {
  return [{ role: 'system', content: systemPrompt }];
};

const adicionarMensagem = (memoria, role, conteudo) => {
  memoria.push({ role, content: conteudo });
  return memoria;
};

const gerarResposta = async (memoria) => {
  const resposta = await openaiClient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: memoria,
  });
  return resposta.choices[0].message.content;
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
    // Busca ou inicializa a memória
    let memoria = await obterMemoria() || inicializarMemoria();

    // Adiciona mensagem do usuário
    memoria = adicionarMensagem(memoria, 'user', message);

    // Gera resposta do assistente
    const respostaAssistente = await gerarResposta(memoria);

    // Adiciona resposta ao histórico e salva
    memoria = adicionarMensagem(memoria, 'assistant', respostaAssistente);
    await salvarMemoria(memoria);

    // Envia mensagem via WhatsApp
    sendMessage({
      phoneNumber: '5531997153507',
      message: respostaAssistente,
    });

    // Retorna resposta
    res.json({
      status: 'success',
      message: respostaAssistente,
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
