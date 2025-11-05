# API Modelo AgenteIA com WhatsApp

API Node.js que integra Inteligência Artificial (OpenAI) com WhatsApp através da Evolution API, permitindo criar um assistente virtual capaz de manter conversas contextuais e enviar respostas automaticamente via WhatsApp.

## 📋 Descrição

Esta API permite criar um agente de IA que:
- Recebe mensagens via endpoint REST
- Processa as mensagens usando OpenAI GPT-4o-mini
- Mantém contexto da conversa usando Redis
- Envia respostas automaticamente via WhatsApp utilizando Evolution API

## 🚀 Tecnologias

- **Node.js** - Ambiente de execução
- **Express** - Framework web
- **OpenAI** - Integração com GPT-4o-mini para geração de respostas
- **Evolution API** - Integração com WhatsApp
- **Redis** - Armazenamento de memória/conversação
- **Axios** - Cliente HTTP
- **CORS** - Controle de acesso cross-origin

## 📦 Pré-requisitos

- Node.js (versão 14 ou superior)
- Redis instalado e rodando
- Conta OpenAI com API Key
- Evolution API configurada e rodando
- Conta WhatsApp conectada à Evolution API

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd modelo
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:

```env
# Porta do servidor
PORT=3000

# OpenAI Configuration
OPENAI_API_KEY=sua_chave_openai_aqui

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Evolution API Configuration
EVOLUTION_SERVER_URL=http://localhost:8080
EVOLUTION_API_KEY=sua_chave_evolution_aqui
EVOLUTION_INSTANCE=nome_da_sua_instancia
```

## 🎯 Uso

### Iniciar o servidor

**Modo desenvolvimento (com nodemon):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000` (ou na porta configurada no `.env`).

### Endpoints

#### POST `/chat`

Envia uma mensagem para o agente de IA e recebe uma resposta que é automaticamente enviada via WhatsApp.

**Request:**
```json
{
  "message": "Olá, como você pode me ajudar?"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Olá! Sou um chef de cozinha e estou aqui para ajudar você com dicas de cozinha e receitas. Como posso ajudar?"
}
```

**Exemplo usando cURL:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Me dê uma receita de bolo de chocolate"}'
```

## 📁 Estrutura do Projeto

```
modelo/
├── config/
│   ├── openai.config.js      # Configuração do cliente OpenAI
│   └── redis.config.js        # Configuração do cliente Redis
├── routes/
│   └── index.js               # Rotas da API
├── services/
│   └── evolution.js           # Serviço de integração com Evolution API
├── prompts/
│   └── system.prompt.js       # Prompt do sistema para a IA
├── index.js                   # Arquivo principal do servidor
├── package.json               # Dependências do projeto
└── README.md                  # Este arquivo
```

## 🔄 Fluxo de Funcionamento

1. **Recebimento da mensagem**: O endpoint `/chat` recebe uma mensagem do usuário
2. **Recuperação do contexto**: O histórico da conversa é recuperado do Redis
3. **Processamento com IA**: A mensagem é enviada para OpenAI com todo o histórico
4. **Geração da resposta**: A IA gera uma resposta baseada no contexto
5. **Armazenamento**: O histórico é atualizado no Redis com a nova mensagem e resposta
6. **Envio via WhatsApp**: A resposta é automaticamente enviada via Evolution API
7. **Retorno da API**: A resposta é retornada ao cliente

## ⚙️ Configuração Personalizada

### Personalizar o Prompt do Sistema

Edite o arquivo `prompts/system.prompt.js` para personalizar o comportamento do agente de IA:

```javascript
exports.systemPrompt = `
Você é um chef de cozinha que responde em português brasileiro. E dá dicas de cozinha e receitas.
`;
```

### Personalizar Número de WhatsApp

Edite o arquivo `routes/index.js` na linha onde o número está hardcoded:

```javascript
sendMessage({
  phoneNumber: '5531997153507', // Altere para o número desejado
  message: assistantReply,
});
```

## 🐛 Tratamento de Erros

A API retorna erros apropriados em caso de:
- Mensagem não fornecida (400)
- Erro na geração de resposta pela OpenAI (500)
- Erro na conexão com Redis (500)
- Erro no envio via WhatsApp (500)

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento com nodemon (auto-reload)

## 🔒 Segurança

- Certifique-se de não commitar o arquivo `.env` no controle de versão
- Use variáveis de ambiente para todas as credenciais sensíveis
- Configure CORS adequadamente para produção
- Valide e sanitize todas as entradas do usuário

## 📄 Licença

ISC

## 👤 Autor
[Luiz Carlos Zanini]

## 🤝 Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
---

**Nota**: Este projeto é um modelo/template que pode ser adaptado para diferentes casos de uso, alterando o prompt do sistema e a lógica de negócio conforme necessário.

