
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
      name: "On a whim",
      description: "This cottage core is your perfect getaway from the busy city",
      price: 115.00
    },{
      ownerId: 2,
      address: "1007 Mountain Dr.",
      city: "Buckaroo",
      state: "Oklahoma",
      country: "United States of America",
      lat: 40.7445855,
      lng: -73.9875203,
      name: "Brennan's home",
      description: "Luxury tiny home",
      price: 2075.00
    },{
      ownerId: 3,
      address: "6 Hungtington Ln",
      city: "Rivia",
      state: "Kaer Morhen",
      country: "Poland",
      lat: 54.2316144,
      lng: 23.3282428,
      name: "William's home",
      description: "Home by the lake",
      price: 275.00
    },{
      ownerId: 4,
      address: "123 Apple Ln",
      city: "Arlington",
      state: "Virginia",
      country: "United States",
      lat: 56.33345,
      lng: 21.3282428,
      name: "Cameron's House",
      description: "The place where Geralt was born",
      price: 50.00
    },{
      ownerId: 5,
      address: "789 Rotten Tomatoe",
      city: "Galio",
      state: "Alabama",
      country: "United States",
      lat: 54.2316144,
      lng: 13.234343,
      name: "Andrea's House",
      description: "Wooden home",
      price: 175.00
    },{
      ownerId: 6,
      address: "23457 Pixie Ln",
      city: "Moss",
      state: "Ohio",
      country: "United States",
      lat: 23.2316144,
      lng: 13.234343,
      name: "Fairy Garden",
      description: "This only exists in your dreams...",
      price: 90.00
    }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name : { [Op.in]: ["Han's House", "Brennan's Home", "William's Home", "Cameron's House", "Andrea's House"] }
    }, {})
  }
};
