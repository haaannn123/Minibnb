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
        firstName: 'Demo',
        lastName: 'User',
        email: 'DemoUser@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Han',
        lastName: 'Nguyen',
        email: 'HNguyen@user.io',
        username: 'HNguyen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Brennan',
        lastName: 'Flood',
        email: 'BFlood@user.io',
        username: 'BFlood',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'William',
        lastName: 'Christensen',
        email: 'WChristensen@user.io',
        username: 'WeeWee',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Cameron',
        lastName: 'Beck',
        email: 'CBeck@user.io',
        username: 'CBeck',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Andrea',
        lastName: 'DuBose',
        email: 'ADubose@user.io',
        username: 'ADubose',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['HPott', 'HCavill', 'BJoel', 'WeeWee', 'CBeck', 'ADubose'] }
    }, {});
  }
};
