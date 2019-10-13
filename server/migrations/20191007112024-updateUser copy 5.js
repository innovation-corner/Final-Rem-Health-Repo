"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Hospitals", "admin", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
        as: "admin"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Hospitals", "admin");
  }
};
