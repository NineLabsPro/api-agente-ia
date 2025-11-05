const axios = require("axios");

const {
EVOLUTION_SERVER_URL,
EVOLUTION_API_KEY,
EVOLUTION_INSTANCE
} = process.env

const evolutionApi = axios.create({
  baseURL: EVOLUTION_SERVER_URL,
  headers: {
    apikey: EVOLUTION_API_KEY
  }
})

evolutionApi.interceptors.response.use(response => {
  return response.data
})
    
// Envia uma mensagem
exports.sendMessage = async ( {phoneNumber, message} ) => {
    
    const newMessage = {
      number:phoneNumber,
      text: message,
    linkPreview:true, 
    }
  
    try {
      const result = await evolutionApi.post(`/message/sendText/${EVOLUTION_INSTANCE}`, newMessage)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }