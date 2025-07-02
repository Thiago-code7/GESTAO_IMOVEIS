const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
  });

  Usuario.beforeCreate(async (usuario) => {
    usuario.senha = await bcrypt.hash(usuario.senha, 10);
  });

  Usuario.prototype.verificarSenha = function (senha) {
    return bcrypt.compare(senha, this.senha);
  };

  return Usuario;
};
