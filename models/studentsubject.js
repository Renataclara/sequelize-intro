'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    Score: DataTypes.INTEGER,
    Secret: DataTypes.STRING
  });
    StudentSubject.associate =(models) => {
    StudentSubject.belongsTo(models.Student);
    StudentSubject.belongsTo(models.Subject);
  }
  return StudentSubject;
};
