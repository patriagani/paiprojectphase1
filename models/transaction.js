'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    StallId: DataTypes.INTEGER,
    SellerId: DataTypes.INTEGER,
    BuyerId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Stall, {foreignKey: 'StallId'});
    Transaction.belongsTo(models.Buyer, {foreignKey: 'BuyerId'});
  };
  return Transaction;
};