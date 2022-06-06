'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subcategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subcategory_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_id_fk: {
        type: Sequelize.INTEGER(100),
        references: {model: 'categories', key: 'id', as: 'category_id_fk'},
        onDelete: 'CASCADE'
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('subcategories');
  }
};