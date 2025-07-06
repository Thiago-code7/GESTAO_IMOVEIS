require('dotenv').config();
const path = require('path');

const dialect = process.env.DB_DIALECT || 'sqlite';

let config;

if (dialect === 'sqlite') {
  config = {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database.sqlite'),
  };
} else if (dialect === 'postgres') {
  config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  };
}

module.exports = config;


