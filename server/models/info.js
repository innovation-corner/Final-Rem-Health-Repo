"use strict";
module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define(
    "Info",
    {
      name: {
        type: DataTypes.STRING
      },
      phonenumber: {
        type: DataTypes.STRING
      },
      immunizationCode: {
        type: DataTypes.STRING
      },
      qrCode: {
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      lga: {
        type: DataTypes.STRING
      },
      language: {
        type: DataTypes.ENUM("English", "Pidgin", "Yoruba", "Hausa", "Igbo")
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female")
      }
    },
    {}
  );
  Info.associate = function(models) {
    // associations can be defined here
    Info.hasMany(models.ImmunizationRecord, {
      foreignKey: "immunizationCode",
      as: 'immunizations'
    });
  };
  return Info;
};
