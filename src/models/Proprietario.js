module.exports = (sequelize, DataTypes) => {
  const Proprietario = sequelize.define('Proprietario', {
    nome: DataTypes.STRING,
  });

  Proprietario.associate = (models) => {
    Proprietario.hasMany(models.Imovel, { foreignKey: 'proprietarioId' });
  };

  return Proprietario;
};

  