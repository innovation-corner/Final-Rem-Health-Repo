"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("Infos", "qrCode", {
      type: Sequelize.STRING,
      allowNull: true
    });
    queryInterface.addColumn("Infos", "state", {
      type: Sequelize.STRING,
      allowNull: true
    });
    queryInterface.addColumn("Infos", "lga", {
      type: Sequelize.STRING,
      allowNull: true
    });
    return;
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Infos", "qrCode");
    queryInterface.removeColumn("Infos", "state");
    queryInterface.removeColumn("Infos", "lga");
    return;
  }
};
