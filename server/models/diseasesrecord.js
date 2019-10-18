'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiseasesRecord = sequelize.define('DiseasesRecord', {
    type: DataTypes.STRING,
    state: DataTypes.STRING,
    lga: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
  }, {});
  DiseasesRecord.associate = function(models) {
    // associations can be defined here
    DiseasesRecord.belongsTo(models.Info,{
      foreignKey:'child',
      as: 'reported-diseases'
    })
    DiseasesRecord.belongsTo(models.User,{
      foreignKey:'reportedBy',
      as: 'reported-by'
    })
  };
  return DiseasesRecord;
};