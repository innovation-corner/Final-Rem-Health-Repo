'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiseasesRecord = sequelize.define('DiseasesRecord', {
    type: DataTypes.STRING
  }, {});
  DiseasesRecord.associate = function(models) {
    // associations can be defined here
  };
  return DiseasesRecord;
};