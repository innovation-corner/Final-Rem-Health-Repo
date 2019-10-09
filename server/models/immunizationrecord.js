"use strict";
module.exports = (sequelize, DataTypes) => {
  const ImmunizationRecord = sequelize.define(
    "ImmunizationRecord",
    {
      type: DataTypes.STRING
    },
    {}
  );
  ImmunizationRecord.associate = function(models) {
    // associations can be defined here
    
  };
  return ImmunizationRecord;
};
