const { createClient } = require("redis");
require("dotenv").config();
const client =  createClient({
    username: process.env.REDIS_NAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST|| undefined,
        port: process.env.REDIS_PORT,
    }
});

client.on('error', (err) => {
  console.error('Redis Error:', err);
});


 
client.on('connect', () => {
  console.log('Redis Connected');


  const startRedis = async ()=>{
 
}

startRedis()
});




module.exports = client