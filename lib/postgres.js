const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'another_user',
    password: 'another_password',
    database: 'my_database',
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
