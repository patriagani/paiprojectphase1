'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stall = sequelize.define('Stall', {
    SellerId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {});
  Stall.associate = function(models) {
    Stall.belongsTo(models.Seller, {foreignKey: 'SellerId'});
    Stall.hasMany(models.Transaction, {foreignKey: 'StallId'});
    Stall.hasMany(models.Review, {foreignKey: 'StallId'});
  };
  return Stall;
};