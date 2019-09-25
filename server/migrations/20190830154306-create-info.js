"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Infos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phonenumber: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      hospitalCode: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      immunizationCode: {
        type: Sequelize.STRING
      },
      qrCode: {
        type: Sequelize.BLOB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Infos");
  }
};
