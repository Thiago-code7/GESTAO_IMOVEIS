module.exports = (sequelize, DataTypes) => {
  const isSQLite = sequelize.getDialect() === 'sqlite';

  const Imovel = sequelize.define('Imovel', {
    endereco: DataTypes.STRING,
    tipo: DataTypes.STRING,
    valorAluguel: DataTypes.DECIMAL,
    disponivel: DataTypes.BOOLEAN,
    fotos: isSQLite
      ? {
          type: DataTypes.TEXT,
          get() {
            const raw = this.getDataValue('fotos');
            return raw ? JSON.parse(raw) : [];
          },
          set(value) {
            this.setDataValue('fotos', JSON.stringify(value));
          }
        }
      : {
          type: DataTypes.ARRAY(DataTypes.STRING)
        }
  });

  Imovel.associate = (models) => {
    Imovel.belongsTo(models.Proprietario, { foreignKey: 'proprietarioId' });
  };

  return Imovel;
};
