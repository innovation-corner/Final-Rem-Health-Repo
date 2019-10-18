"use strict";
module.exports = (sequelize, DataTypes) => {
  const ImmunizationRecord = sequelize.define(
    "ImmunizationRecord",
    {
      type: DataTypes.STRING,
      lat: DataTypes.STRING,
      lon: DataTypes.STRING
    },
    {}
  );
  ImmunizationRecord.associate = function(models) {
    // associations can be defined here
    ImmunizationRecord.belongsTo(models.Info,{
      foreignKey: "child",
      as: 'childImmunized'
    });
    
  };
  return ImmunizationRecord;
};
