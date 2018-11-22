'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Seller.associate = function(models) {
    Seller.hasMany(models.Stall, {foreignKey: 'SellerId'});
    Seller.hasMany(models.Transaction, {foreignKey: 'SellerId'});
    Seller.belongsToMany(models.Buyer, {through: 'Transaction', foreignKey: 'SellerId'});
  };
  return Seller;
};