'use strict';
module.exports = (sequelize, DataTypes) => {
  const HMO = sequelize.define('HMO', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  HMO.associate = function(models) {
    // associations can be defined here
    HMO.belongsTo(models.User,{
      foreignKey:'admin',
      as:'hmo'
    })
  };
  return HMO;
};