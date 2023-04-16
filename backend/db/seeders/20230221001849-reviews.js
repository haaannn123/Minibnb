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
        userId: 10,
        review: "I loved this place",
        stars: 5,
      },
      { spotId: 2,
        userId: 9,
        review: "This place was amazing! The views were breathtaking and the cabin was cozy and comfortable. Would definitely recommend.",
        stars: 5
      },{
        spotId: 3,
        userId: 8,
        review: "I was disappointed with my stay. The house was dirty and the amenities were outdated. Not worth the price.",
        stars: 2
      },{
        spotId: 4,
        userId: 7,
        review: "This was the perfect getaway! The location was peaceful and serene, and the house was beautifully decorated. Can't wait to come back!",
        stars: 5
      },{
        spotId: 5,
        userId: 6,
        review: "The location was great, but the house itself was not very clean. There were stains on the carpet and the bathroom was not well-maintained.",
        stars: 3
      },{
        spotId: 6,
        userId: 5,
        review: "This was the perfect place for a weekend retreat. The house was cozy and comfortable, and the views were incredible. Highly recommend!",
        stars: 4
      },{
        spotId: 7,
        userId: 4,
        review: "I was disappointed with my stay. The house was not as advertised and the amenities were lacking. Would not recommend.",
        stars: 2
      },{
        spotId: 8,
        userId: 3,
        review: "This house was absolutely gorgeous! The location was perfect and the views were stunning. Would definitely come back.",
        stars: 5
      },{
        spotId: 9,
        userId: 2,
        review: "I had a great time at this location. The house was clean and comfortable, and the views were breathtaking. Highly recommend!",
        stars: 4
      },{
        spotId: 10,
        userId: 1,
        review: "I was not impressed with this location. The house was outdated and not very clean. Would not stay here again.",
        stars: 2
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
