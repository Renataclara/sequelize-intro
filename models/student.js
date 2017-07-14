'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:
      { isEmail: {msg: "Must in email format"},
      isUnique: (value, next) => { //next callback , value adalah value yg kamu mau check
        Student.findAndCountAll({
          where: {
            email:value
          }
        })
        .then( email => {
          if (email.count > 0) return next('Email already in use');
          return next();
        })
        .catch(err => next(err));
      }
    }
    },
    jurusan: DataTypes.STRING});
    Student.associate =(models) => {
     Student.belongsToMany(models.Subject, {through: 'StudentSubject'});
  }
  return Student;
};
