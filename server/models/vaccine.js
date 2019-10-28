"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vaccine = sequelize.define(
    "Vaccine",
    {
      name: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Vaccine already exists!"
        }
      }
    },
    {}
  );
  Vaccine.associate = function(models) {
    // associations can be defined here
  };
  return Vaccine;
};
