
'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
      ownerId: 1,
      address: "7683 Erb Way",
      city: "Tracy",
      state: "California",
      country: "USA",
      lat: 37.7073317,
      lng: -121.4011945,
      name: "MC Hammer's Home",
      description: "The place where MC Hammer lives",
      price: 700000.00
    },{
      ownerId: 2,
      address: "1007 Mountain Dr.",
      city: "Gotham City",
      state: "New York",
      country: "USA",
      lat: 40.7445855,
      lng: -73.9875203,
      name: "Wayne Manor",
      description: "The place where Bruce Wayne resides",
      price: 9000000.00
    },{
      ownerId: 3,
      address: "6 Hungtington Ln",
      city: "Rivia",
      state: "Kaer Morhen",
      country: "Poland",
      lat: 54.2316144,
      lng: 21.3282428,
      name: "Witcher's House",
      description: "The place where Geralt was born",
      price: 50.00
    }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name : { [Op.in]: ["MC Hammer's Home", "Wayne Manor", "Witcher's House"] }
    }, {})
  }
};
