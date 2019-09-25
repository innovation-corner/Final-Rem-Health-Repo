"use strict";
module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define(
    "Info",
    {
      name: {
        type: DataTypes.STRING,
      },
      phonenumber: {
        type: DataTypes.STRING,
      },
      immunizationCode: {
        type: DataTypes.STRING,
      },
      qrCode: {
        type: DataTypes.BLOB,
      },
      dob: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING
      },
      language: {
        type: DataTypes.ENUM("English","Pidgin","Yoruba","Hausa","Igbo"),
      },
      gender: {
        type: DataTypes.ENUM("Male","Female"),
      },
      hospitalCode: {
        type: DataTypes.STRING,
      }
    },
    {}
  );
  Info.associate = function(models) {
    // associations can be defined here
  };
  return Info;
};
