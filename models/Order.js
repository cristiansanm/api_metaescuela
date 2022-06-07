'use strict';
const zlib = require('zlib');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //One order belongs to one user
      Order.belongsTo(models.User, {foreignKey: 'buyer_id_fk'})

      //Many orders have many products
      Order.belongsToMany(models.Product, {through: models.OrdersProducts, foreignKey: 'order_id_fk'})

    }
  }
  Order.init({
    order_total: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    buyer_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'users', key: 'id', as: 'buyer_id_fk'},
      onDelete: 'CASCADE',
    }, 
    order_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }

  }, {
    sequelize,
    modelName: 'Order',
    underscored:true,
    tableName: 'orders',
    timestamps: false
  });
  return Order;
};