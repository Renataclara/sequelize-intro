'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
    'StudentSubjects',
    'Score',
    Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
  }
};
