'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     *
     * 
    */
    // await queryInterface.bulkInsert('users', [{
    //   user_name: 'ric',
    //   user_lastname: 'nenr',
    //   user_email: 'ricd@gmail.com',  
    //   user_password: '12345678',
    //   user_phone: '078989898' ,
    //   user_grade: 'primero_eso',
    //   user_is_seller: true,
    //   user_is_buyer: true,
    //   user_profile_image: null
    //   },
    //   {
    //   user_name: 'richar',
    //   user_lastname: 'nenje',
    //   user_email: 'richar@gmail.com',  
    //   user_password: '12345678',
    //   user_phone: '078989898' ,
    //   user_grade: 'primero_eso',
    //   user_is_seller: true,
    //   user_is_buyer: true,
    //   user_profile_image: null
    //   }], {

    //   });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
