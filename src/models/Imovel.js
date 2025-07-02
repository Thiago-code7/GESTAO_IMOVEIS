module.exports = (sequelize, DataTypes) => {
  const Imovel = sequelize.define('Imovel', {
    endereco: DataTypes.STRING,
    tipo: DataTypes.STRING,
    valorAluguel: DataTypes.DECIMAL,
    disponivel: DataTypes.BOOLEAN,
    fotos: DataTypes.ARRAY(DataTypes.STRING),
  });

  Imovel.associate = (models) => {
    Imovel.belongsTo(models.Proprietario, { foreignKey: 'proprietarioId' });
  };

  return Imovel;
};

  