"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: "I loved this place",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: "Felt very unsafe",
        stars: 1,
      },
      {
        spotId: 3,
        userId: 3,
        review: "Cool beans",
        stars: 3,
      },{
        spotId: 4,
        userId: 4,
        review: "awesome place!",
        stars: 3,
      },{
        spotId: 5,
        userId: 5,
        review: "Would return",
        stars: 5,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3, 4, 5]}
    }, {})
  },
};
