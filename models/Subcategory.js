'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Many subcategories belong to one category
      this.belongsTo(models.Category, {foreignKey: 'category_id_fk'})
      //One subcategory can have many products
      this.hasMany(models.Product, {foreignKey: 'subcategory_id_fk'})
    }
  }
  Subcategory.init({
    subcategory_name: DataTypes.STRING,
    category_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {model: 'categories', key: 'id', as: 'category_id_fk'},
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'subcategories',
    modelName: 'Subcategory',
  });
  return Subcategory;
};