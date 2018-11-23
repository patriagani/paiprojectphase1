'use strict';
const {encrypt} = require('../helpers')

module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(user, options) {
        user.password = encrypt(user.password)
      }
    }
  });
  Seller.associate = function(models) {
    Seller.hasMany(models.Stall, {foreignKey: 'SellerId'});
    Seller.hasMany(models.Transaction, {foreignKey: 'SellerId'});
    Seller.belongsToMany(models.Buyer, {through: 'Transaction', foreignKey: 'SellerId'});
  };
  return Seller;
};