'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Seller.associate = function(models) {
    Seller.hasMany(models.Stall, {foreignKey: 'SellerId'});
  };
  return Seller;
};