'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    TransactionId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    sender: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Transaction, {foreignKey: 'TransactionId'});
  };
  return Comment;
};