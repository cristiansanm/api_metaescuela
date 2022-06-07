'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      }
      // ,
      // created_at: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
      ,
      product_name: { 
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      product_stock: { 
        type: Sequelize.INTEGER,
        allowNull: true, 
        defaultValue: 1,
      },
      product_description: { 
        type: Sequelize.TEXT,
        allowNull: true,
      },
      product_price: { 
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_availability: { 
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      seller_id_fk: {
        type: Sequelize.INTEGER,
        references: {model: 'users', key: 'id', as: 'seller_id_fk'},
        onDelete: 'CASCADE'
      },
      subcategory_id_fk: {
        type: Sequelize.INTEGER,
        references: {model: 'subcategories', key: 'id', as: 'subcategory_id_fk'},
        onDelete: 'CASCADE'
      }
      // ,
      // updated_at: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('products');
  }
};