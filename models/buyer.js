'use strict';
const {encrypt} = require('../helpers')

module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(user, options) {
        user.password = encrypt(user.password)
      }
    }
  });
  Buyer.associate = function(models) {
    Buyer.hasMany(models.Transaction, {foreignKey: 'BuyerId'});
    Buyer.hasMany(models.Review, {foreignKey: 'BuyerId'});
    Buyer.belongsToMany(models.Seller, {through: 'Transaction', foreignKey: 'BuyerId'});
  };
  return Buyer;
};