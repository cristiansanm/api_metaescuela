'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Many products belong to one User
      Product.belongsTo(models.User, {foreignKey: 'seller_id_fk'})
      //Many products have a subcategory
      Product.belongsTo(models.Subcategory, {foreignKey: 'subcategory_id_fk'})
      //Many products have many order
      Product.belongsToMany(models.Order, {through: models.OrdersProducts, foreignKey: 'product_id_fk'})
    }
  }
  Product.init({
    product_name: { 
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    product_stock: { 
      type: DataTypes.INTEGER,
      allowNull: true, 
      defaultValue: 1,
      validate: {
          isNumeric: {
              msg: "Only numbers are allowed"
          }
      }
    },
    product_description: { 
      type: DataTypes.TEXT,
      allowNull: true,
      set(value){
          const compressed = zlib.deflateSync(value).toString('base64');
          this.setDataValue('product_description', compressed);
      },
      get(){
          const value = this.getDataValue('product_description');
          const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
          return uncompressed.toString();
      }
    },
    product_price: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          isNumeric: {
              msg: "Only numbers are allowed"
          }
      }
    },
    product_availability: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    product_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    subcategory_id_fk:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {model:'subcategories', key:'id', as:'subcategory_id_fk'},
      onDelete: 'CASCADE',
    },
    seller_id_fk:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model:'users', key:'id', as:'seller_id_fk'},
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
    underscored: true,
    modelName: 'Product',
    timestamps: false
  });
  return Product;
};