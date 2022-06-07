'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_total: {
        type: Sequelize.INTEGER
      },
      buyer_id_fk: {
        type: Sequelize.INTEGER(100),
        references: {model: 'users', key: 'id', as: 'buyer_id_fk'},
        onDelete: 'CASCADE',
      },
      order_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
      // ,
      // created_at: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updated_at: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('orders');
  }
};