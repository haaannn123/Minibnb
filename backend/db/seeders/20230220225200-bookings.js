'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        startDate: "2023-01-20",
        endDate: "2024-01-20"
      },
      {
        startDate: "2023-01-20",
        endDate: "2024-01-20"
      },
      {
        startDate: "2023-01-20",
        endDate: "2024-01-20"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['HPott', 'HCavill', 'BJ4200'] }
    }, {});
  }
};
