require('dotenv').config();

const express = require('express');
const { sequelize } = require('./src/models');

const authRoutes = require('./src/routes/authRoutes');
const imovelRoutes = require('./src/routes/imovelRoutes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/imoveis', imovelRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.sync();
    console.log('Banco sincronizado com sucesso!');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao sincronizar banco:', error);
  }
}

startServer();
