'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
    'Users',
    'Secret',
    Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    // return queryInterface.removeColumn({
    //   tableName: 'StudentSubjects',
    //   column: 'Secret'
    // },

  }
};
