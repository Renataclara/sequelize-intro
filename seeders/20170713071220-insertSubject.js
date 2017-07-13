'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Subjects', [{
    subject_name: 'Kimia',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    subject_name: 'Ekonomi',
    createdAt: new Date(),
    updatedAt: new Date()
  }],{});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Subjects', null, {});
  }
};
