'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    StallId: DataTypes.INTEGER,
    BuyerId: DataTypes.INTEGER,
    review: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Stall, {foreignKey: 'StallId'});
    Review.belongsTo(models.Buyer, {foreignKey: 'BuyerId'});
  };
  return Review;
};