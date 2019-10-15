"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("DiseasesRecords", "reportedBy", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        foreignKey: "id",
        as: "reportedBy"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("DiseasesRecords", "reportedBy");
  }
};
