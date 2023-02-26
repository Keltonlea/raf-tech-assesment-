const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Parcel = sequelize.define('Parcel', {
  pin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  market_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  sale_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  sale_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false
  },
  maplink: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'mytable',
  timestamps: false
});

module.exports = Parcel;
