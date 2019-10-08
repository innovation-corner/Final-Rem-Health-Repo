"use strict";
module.exports = (sequelize, DataTypes) => {
  const SMS = sequelize.define(
    "SMS",
    {
      message: DataTypes.STRING,
      title: DataTypes.STRING,
      recipients: {
        type: DataTypes.STRING,
        get() {
          return this.getDataValue("amenities").split(";");
        },
        set(val) {
          return this.setDataValue("amenities", val.join(";"));
        }
      }
    },
    {}
  );
  SMS.associate = function(models) {
    // associations can be defined here
    SMS.hasOne(models.User,{
      foreignKey: 'id',
      as: 'sender'
    })
  };
  return SMS;
};
