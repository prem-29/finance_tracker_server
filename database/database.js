import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv'; // ✅ use import if using ES modules
dotenv.config();
const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT),
});
client.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch((err) => console.error('❌ Could not connect to PostgreSQL:', err));

export default client;
