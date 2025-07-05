import pkg from 'pg';
const { Client } = pkg;
const client = new Client({
    user: "dbuser",
    host: "maglev.proxy.rlwy.net",
    database: "railway",
    password: "dbpass",
    port: "36611",
});
client.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch((err) => console.error('❌ Could not connect to PostgreSQL:', err));

export default client;
