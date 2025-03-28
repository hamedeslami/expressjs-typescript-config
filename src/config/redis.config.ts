import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD,
  socket: {
    tls: process.env.REDIS_TLS === 'true',
  }
});

redis.on('error', err => console.error('❌ Redis Client Error:', err));
redis.on('connect', () => console.log('✅ Connected to Redis successfully.'));
redis.connect();

export default redis;