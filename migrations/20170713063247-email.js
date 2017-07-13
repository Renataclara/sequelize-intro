'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Teachers',
      'email',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Teachers', 'email')
  }
};
