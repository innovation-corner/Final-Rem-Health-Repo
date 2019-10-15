"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("DiseasesRecords", "child", {
      type: Sequelize.INTEGER,
      references:{
        model: 'Infos',
        foreignKey: 'id',
        as:'child'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("DiseasesRecords", "child");
  }
};
