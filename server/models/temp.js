"use strict";
module.exports = (sequelize, DataTypes) => {
  const Temp = sequelize.define(
    "Temp",
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
      dob: {
        type: DataTypes.STRING
      },
      sessionId: {
        type: DataTypes.STRING
      },
      language: {
        type: DataTypes.ENUM("English", "Pidgin", "Yoruba", "Hausa", "Igbo")
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female")
      },
      hospitalCode: {
        type: DataTypes.STRING
      }
    },
    {}
  );
  Temp.associate = function(models) {
    // associations can be defined here
  };
  return Temp;
};
