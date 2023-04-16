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
        hashedPassword: bcrypt.hashSync('coolbeans123')
      },
      {
        firstName: 'Han',
        lastName: 'Nguyen',
        email: 'HNguyen@user.io',
        username: 'HNguyen',
        hashedPassword: bcrypt.hashSync('coolbeans123')
      },
      {
        firstName: 'Brennan',
        lastName: 'Flood',
        email: 'BFlood@user.io',
        username: 'BFlood',
        hashedPassword: bcrypt.hashSync('coolbeans123')
      },
      {
        firstName: 'William',
        lastName: 'Christensen',
        email: 'WChristensen@user.io',
        username: 'WeeWee',
        hashedPassword: bcrypt.hashSync('coolbeans123')
      },
      {
        firstName: 'Cameron',
        lastName: 'Beck',
        email: 'CBeck@gmail.com',
        username: 'CBeck',
        hashedPassword: bcrypt.hashSync('coolbeans123')
        },
        {
        firstName: 'Jake',
        lastName: 'Gularte',
        email: 'JGularte@gmail.com',
        username: 'JGularte',
        hashedPassword: bcrypt.hashSync('coolbeans123')
        },
        {
        firstName: 'Andrea',
        lastName: 'DuBose',
        email: 'AndreaDuBose@gmail.com',
        username: 'ADubose',
        hashedPassword: bcrypt.hashSync('coolbeans123')
        },
        {
        firstName: 'Rawaha',
        lastName: 'Memon',
        email: 'RawahaMemon@gmail.com',
        username: 'RMemon',
        hashedPassword: bcrypt.hashSync('coolbeans123')
        },
        {
        firstName: 'Ash',
        lastName: 'Iranfar',
        email: 'AshIranfar@user.io',
        username: 'AIranfar',
        hashedPassword: bcrypt.hashSync('coolbeans123')
        },
        {
        firstName: 'Gabriel',
        lastName: 'Parker',
        email: 'GabrielParker@user.io',
        username: 'GabrielParker',
        hashedPassword: bcrypt.hashSync('coolbeans123')
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
