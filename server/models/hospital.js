"use strict";
module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define(
    "Hospital",
    {
      name: DataTypes.STRING,
      code: {
        type: DataTypes.STRING
      }
    },
    {}
  );
  Hospital.associate = function(models) {
    // associations can be defined here
  };
  return Hospital;
};
