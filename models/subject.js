'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
    Subject.associate =(models) => {
      Subject.hasMany(models.Teacher);
     Subject.belongsToMany(models.Student, {through: 'StudentSubject' });
    }
  return Subject;
};
// };
//
//  Profil.associate =(models) =>
//  hasOne(models.Address);
// }
// return profile
