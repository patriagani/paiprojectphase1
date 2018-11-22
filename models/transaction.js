'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    StallId: DataTypes.INTEGER,
    BuyerId: DataTypes.INTEGER,
    SellerId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Stall, {foreignKey: 'StallId'});
    Transaction.belongsTo(models.Buyer, {foreignKey: 'BuyerId'});
    Transaction.belongsTo(models.Seller, {foreignKey: 'SellerId'});
    Transaction.hasMany(models.Comment, {foreignKey: 'TransactionId'});
  };
  return Transaction;
};