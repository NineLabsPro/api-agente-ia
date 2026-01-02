const redisClient = require('../config/redis.config');

const salvarMemoria = async (memoria) => {
  await redisClient.set('memory', JSON.stringify(memoria));
};

const obterMemoria = async () => {
  const memoria = await redisClient.get('memory');
  return memoria ? JSON.parse(memoria) : null;
};

module.exports = {
  salvarMemoria,
  obterMemoria,
};

