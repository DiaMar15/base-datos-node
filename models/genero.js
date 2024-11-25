const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../server/database');


const Genero = sequelize.define('Genero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'genero',
  timestamps: false,
});

module.exports = Genero;
