"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  Up: async (queryInterface, Sequelize) => {
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
        userId: 2,
        review: "Can't wait to return",
        stars: 3,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3]}
    }, {})
  },
};
