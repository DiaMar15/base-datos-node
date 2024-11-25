const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('libreria', 'root', 'S3Na2024*', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('No se pudo conectar a la base de datos:', err));

module.exports = sequelize;
