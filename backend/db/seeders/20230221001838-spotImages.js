'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://i.imgur.com/ZQZdcko.jpg",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/GJt1Y2D.jpg",
        preview: true,
      },{
        spotId: 3,
        url: "https://i.imgur.com/dSzUITY.png",
        preview: true,
      },{
        spotId: 4,
        url: "https://i.imgur.com/oyYvwoh.jpg",
        preview: true,
      },{
        spotId: 5,
        url: "https://i.imgur.com/UOdza8F.png",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://i.imgur.com/V3Q6Hab.png",
        preview: true,
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3, 4, 5]}
    }, {})
  }
};
