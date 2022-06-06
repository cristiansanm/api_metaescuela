'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdersProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Many orders have many products
      OrdersProducts.belongsTo(models.Product, {foreignKey: 'product_id_fk'})

      //Many orders have many products
      OrdersProducts.belongsTo(models.Order, {foreignKey: 'order_id_fk'})
    }
  }
  OrdersProducts.init({
    product_quantity: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    product_subtotal: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    product_id_fk: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'products', key: 'id', as: 'product_id_fk'},
      onDelete: 'CASCADE',
    },
    order_id_fk: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'orders', key: 'id', as: 'order_id_fk'},
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'orders_products',
    modelName: 'OrdersProducts',
  });
  return OrdersProducts;
};