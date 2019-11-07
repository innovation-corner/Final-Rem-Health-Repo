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
        type: Sequelize.STRING,
        // references: {
        //   model: "Hospitals",
        //   key: "code",
        //   as: "PHC"
        // }
      },
      hmo: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "hmo",
        //   as: "hmo"
        // }
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
      lga: {
        type: Sequelize.STRING
      },
      qrCode: {
        type: Sequelize.STRING
      },
      immunizationCode: {
        type: Sequelize.STRING
      },
      qrCode: {
        type: Sequelize.STRING
      },
      fatherName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      motherName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lat: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lon: {
        allowNull: true,
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
    return queryInterface.dropTable("Infos");
  }
};
