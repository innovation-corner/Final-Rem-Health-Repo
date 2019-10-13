"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("ImmunizationRecords", "child", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references:{
        model: "Info",
        key: "id",
        as: "child"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("ImmunizationRecords", "child");
  }
};
