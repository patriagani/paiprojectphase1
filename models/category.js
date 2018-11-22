'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.belongsTo(models.Stall, {foreignKey: 'CategoryId'})
  };
  return Category;
};