'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: { 
        type: Sequelize.STRING,
        allowNull: false, 
      },
      user_lastname: { 
        type: Sequelize.STRING,
        allowNull: false, 
      },
      user_email: { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      user_password: { 
        type: Sequelize.STRING, 
        allowNull: false,
      },
      user_phone: { 
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_grade: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_is_seller: { 
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      user_is_buyer: { 
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      user_profile_image: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('users');
  }
};