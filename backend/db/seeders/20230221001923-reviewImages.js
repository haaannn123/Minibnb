'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'images.url',
      },{
        reviewId: 3,
        url: 'images3.url',
      },{
        reviewId: 2,
        url: 'images2.url',
      },{
        reviewId: 4,
        url: 'images3.url',
      },{
        reviewId: 5,
        url: 'images1.url',
      },{
        reviewId: 6,
        url: 'images1.url',
      },{
        reviewId: 7,
        url: 'images1.url',
      },{
        reviewId: 8,
        url: 'images1.url',
      },{
        reviewId: 9,
        url: 'images1.url',
      },{
        reviewId: 10,
        url: 'images1.url',
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3, 4, 5]}
    }, {})
  }
};
