'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Categories', [
      {
        category_name: 'Graphic Design',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        category_name: 'Digital Marketing',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        category_name: 'Writing Translation',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        category_name: 'Video and Animation',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        category_name: 'Music and Audio',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        category_name: 'Programming',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        category_name: 'Fun and Lifestyle',
        createdAt: new Date,
        updatedAt: new Date
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
