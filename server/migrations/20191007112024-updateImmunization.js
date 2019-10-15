"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("ImmunizationRecords", "administeredBy", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references:{
        model: "Users",
        key: "id",
        as: "admin"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("ImmunizationRecords", "administeredBy");
  }
};
