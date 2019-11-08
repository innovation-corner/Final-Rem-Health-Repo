"use strict";
module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define(
    "Hospital",
    {
      name: DataTypes.STRING,
      code: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      lga: {
        type: DataTypes.STRING
      },
      lat: {
        type: DataTypes.STRING
      },
      lon: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.TEXT
      }
    },
    {}
  );
  Hospital.associate = function(models) {
    // associations can be defined here
    Hospital.hasMany(models.Info, {
      foreignKey: "hospitalCode",
      as: "registrations"
    });
    Hospital.belongsTo(models.User, {
      foreignKey: "admin",
      as: "administrator"
    });
  };
  return Hospital;
};
