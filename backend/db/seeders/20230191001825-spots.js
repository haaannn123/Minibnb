"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "7683 Erb Way",
        city: "Salt Lake City",
        state: "Nevada",
        country: "United States",
        lat: 37.7073317,
        lng: -121.4011945,
        name: "By the Lake",
        description: "This place has everything you need for you perfect getaway! With stunning views, and 5 mins from downtown.",
        price: 115.0,
      },
      {
        ownerId: 2,
        address: "1007 Mountain Dr",
        city: "Moss",
        state: "Washington",
        country: "United States",
        lat: 40.7445855,
        lng: -73.9875203,
        name: "Happy House",
        description: "This beautiful home is located in the heart of Houston and offers a peaceful retreat from the busy city. Enjoy the beautiful natural surroundings and take in the stunning views.",
        price: 100,
      },
      {
        ownerId: 3,
        address: "106 Cole Ave",
        city: "Southbridge",
        state: "Michigan",
        country: "United States",
        lat: 54.2316144,
        lng: 23.3282428,
        name: "Youtuber's House",
        description: "Home by the lake",
        price: 2000.0,
      },
      {
        ownerId: 4,
        address: "3125 W 32nd Avenue",
        city: "Denver",
        state: "Colorado",
        country: "United States",
        lat: 39.7610267,
        lng: -105.0293508,
        name: "The Mile High Retreat",
        description:
          "This beautiful home is located in the heart of Denver and offers stunning views of the city and the Rocky Mountains.",
        price: 165.0,
      },
      {
        ownerId: 5,
        address: "1638 Pecan Grove Drive",
        city: "Houston",
        state: "Texas",
        country: "United States",
        lat: 29.7577569,
        lng: -95.4603225,
        name: "The Houston Haven",
        description: "This beautiful home is located in the heart of Houston and offers a peaceful retreat from the busy city.",
        price: 145.0,
      },
      {
        ownerId: 6,
        address: "2571 Franklin Street",
        city: "San Francisco",
        state: "California",
        country: "United States",
        lat: 37.8043558,
        lng: -122.4232034,
        name: "The San Francisco Escape",
        description: "This beautiful home is located in the heart of San Francisco and offers stunning views of the city skyline.",
        price: 195.0,
      },
      {
        ownerId: 7,
        address: "8303 Sunnybrook Drive",
        city: "Boise",
        state: "Idaho",
        country: "United States",
        lat: 43.5997116,
        lng: -116.2564169,
        name: "Cedar Grove Retreat",
        description: "This rustic cabin is the perfect escape from the hustle and bustle of the city.",
        price: 95.0,
      },
      {
        ownerId: 8,
        address: "456 Hillside Avenue",
        city: "Asheville",
        state: "Tokyo",
        country: "Japan",
        lat: 35.6076629,
        lng: -82.5234993,
        name: "Kanao Tsuyuri",
        description: "Stay with us forever, we will protect you from demons.",
        price: 200.0,
      },
      {
        ownerId: 9,
        address: "1721 Pine Street",
        city: "Boulder",
        state: "Colorado",
        country: "United States",
        lat: 40.0192155,
        lng: -105.2836918,
        name: "The Boulder Retreat",
        description:
          "This beautiful mountain home is the perfect place to unwind and reconnect with nature. Enjoy the peaceful surroundings and take in the breathtaking views.",
        price: 175.0,
      },
      {
        ownerId: 10,
        address: "1459 Sunnyside Avenue",
        city: "Salt Lake City",
        state: "Utah",
        country: "United States",
        lat: 40.7582633,
        lng: -111.8693425,
        name: "The Salt Lake City Sanctuary",
        description:
          "This beautiful home is the perfect place to relax and recharge. Enjoy the beautiful natural surroundings and take in the stunning views of the city.",
        price: 135.0,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: { [Op.in]: ["Han's House", "Brennan's Home", "William's Home", "Cameron's House", "Andrea's House"] },
      },
      {}
    );
  },
};
