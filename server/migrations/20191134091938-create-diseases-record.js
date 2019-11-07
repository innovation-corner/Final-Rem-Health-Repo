"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("DiseasesRecords", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      lga: {
        type: Sequelize.STRING
      },
      child: {
        type: Sequelize.INTEGER,
        references: {
          model: "Infos",
          foreignKey: "id",
          as: "child"
        }
      },
      reportedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          foreignKey: "id",
          as: "reportedBy"
        }
      },
      lat: {
        type: Sequelize.STRING
      },
      lon: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable("DiseasesRecords");
  }
};
