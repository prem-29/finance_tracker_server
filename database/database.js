import pkg from 'pg';
const { Client } = pkg;
const client = new Client({
    user: "dbuser",
    host: "localhost",
    database: "finance_tracker",
    password: "dbpass",
    port: "5432",
});
client.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch((err) => console.error('❌ Could not connect to PostgreSQL:', err));

export default client;
