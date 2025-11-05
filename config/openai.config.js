const openai = require('openai');

const openaiClient = new openai({
    apiKey: process.env.OPENAI_API_KEY
});

module.exports = openaiClient;