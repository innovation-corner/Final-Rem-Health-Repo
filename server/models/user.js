"use strict";
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "Invalid email" },
          notNull: { msg: "email is required" }
        },
        unique: {
          args: true,
          msg: "Email address already in use!"
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "username is required" }
        },
        unique: {
          args: true,
          msg: "Username already in use!"
        }
      },
      state: {
        type: DataTypes.STRING
      },
      phonenumber: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Phonenumber already exists!"
        }
      },
      role: {
        type: DataTypes.ENUM(
          "superAdmin",
          "nationalAdmin",
          "stateAdmin",
          "user"
        ),
        defaultValue: "user"
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password is required" }
        }
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
  });

  User.beforeUpdate(user => {
    if (user.password) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(8),
        null
      );
    }
  });

  User.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());

    delete values.password;
    if (values.verificationCode) {
      delete values.verificationCode;
    }
    return values;
  };
  return User;
};
