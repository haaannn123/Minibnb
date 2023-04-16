"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 10,
          startDate: "2023-02-20",
          endDate: "2023-02-24",
        },
        {
          spotId: 2,
          userId: 9,
          startDate: "2023-02-25",
          endDate: "2023-03-01",
        },
        {
          spotId: 3,
          userId: 8,
          startDate: "2023-03-03",
          endDate: "2023-03-07",
        },{
          spotId: 4,
          userId: 7,
          startDate: "2023-03-03",
          endDate: "2023-03-07",
        },{
          spotId: 5,
          userId: 6,
          startDate: "2023-03-03",
          endDate: "2023-03-07",
        },
        {
          spotId: 6,
          userId: 5,
          startDate: "2023-03-03",
          endDate: "2023-03-07",
        },
        {
          spotId: 7,
          userId: 4,
          startDate: "2023-03-03",
          endDate: "2023-03-07",
        },{
          spotId: 8,
          userId: 3,
          startDate: "2023-03-03",
          endDate: "2023-03-07",
        },{
          spotId: 9,
          userId: 2,
          startDate: "2023-03-03",
          endDate: "2023-03-07",
        },{
          spotId: 10,
          userId: 1,
          startDate: "2023-03-03",
          endDate: "2023-03-07",
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
