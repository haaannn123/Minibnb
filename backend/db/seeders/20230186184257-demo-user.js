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
        firstName: 'Harry',
        lastName: 'Potter',
        email: 'HPott@user.io',
        username: 'HPott',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Henry',
        lastName: 'Cavill',
        email: 'HCavill@user.io',
        username: 'HCavill',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Billy',
        lastName: 'Joel',
        email: 'billyJoel@user.io',
        username: 'BJoel',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['HPott', 'HCavill', 'BJoel'] }
    }, {});
  }
};
