'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.addColumn(
      'Teachers',
      'SubjectId',
      Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    //return queryInterface.removeColumn('Teachers', 'SubjectId')
  }
};
