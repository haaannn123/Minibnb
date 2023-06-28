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
        url: "https://i.imgur.com/gMljqMV.png",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/agJJMMN.png",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/7dg3tFC.png",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/rLGsaXU.png",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/lVdmgkX.png",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/vrIV16L.png",
        preview: true,
      },{
        spotId: 3,
        url: "https://i.imgur.com/MpWrr7M.png",
        preview: true,
      },{
        spotId: 4,
        url: "https://i.imgur.com/dSzUITY.png",
        preview: true,
      },{
        spotId: 5,
        url: "https://i.imgur.com/oyYvwoh.jpg",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://i.imgur.com/KYL5uvQ.png",
        preview: true,
      },{
        spotId: 7,
        url: "https://i.imgur.com/IY5uNq9.png",
        preview: true,
      },{
        spotId: 8,
        url: "https://i.imgur.com/aKuC3X8.jpg",
        preview: true,
      },{
        spotId: 9,
        url: "https://i.imgur.com/KZ9qfjk.png",
        preview: true,
      },{
        spotId: 10,
        url: "https://i.imgur.com/bS7b4eu.png",
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
