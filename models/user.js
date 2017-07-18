'use strict';

const generate = require('../helpers/generateSecret');
const hash = require('../helpers/hash');

const crypto = require('crypto');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    Secret: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(models) { //after create itu msk k database dlu renata doang, trs before create gnti dlu tmbahin @gmail trs baru save d database
        const secret = generate();
        const hashData = hash(secret, models.password);
        models.password=hashData;
        models.Secret = secret;
      }
    }
  });
  return User;
};
