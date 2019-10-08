"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Infos", {
      qrCode: { type: Sequelize.STRING, allowNull: true },
      state: { type: Sequelize.STRING, allowNull: true },
      lga: { type: Sequelize.STRING, allowNull: true }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Infos", {
      qrCode,
      state,
      lga
    });
  }
};
