const Sequelize = require('sequelize');
const config = require('../config/database');
const sequelize = new Sequelize(config);

const Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);
const Proprietario = require('./Proprietario')(sequelize, Sequelize.DataTypes);
const Imovel = require('./Imovel')(sequelize, Sequelize.DataTypes);

Usuario.associate?.({ Usuario, Proprietario, Imovel });
Proprietario.associate?.({ Usuario, Proprietario, Imovel });
Imovel.associate?.({ Usuario, Proprietario, Imovel });

module.exports = { sequelize, Sequelize, Usuario, Proprietario, Imovel };
