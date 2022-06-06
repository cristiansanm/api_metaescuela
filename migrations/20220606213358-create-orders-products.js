'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_quantity: {
        type: Sequelize.INTEGER
      },
      product_id_fk: {
        type: Sequelize.INTEGER(100),
        references: {model: 'products', key: 'id', as: 'product_id_fk'},
        onDelete: 'CASCADE',
      },
      order_id_fk: {
        type: Sequelize.INTEGER(100),
        references: {model: 'orders', key: 'id', as: 'order_id_fk'},
        onDelete: 'CASCADE',
      },
      product_subtotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('orders_products');
  }
};