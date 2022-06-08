'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products', [{
    //   product_name: 'libro de lengua',
    //   product_stock: 1,
    //   product_description: 'primero eso',
    //   product_price: 100,
    //   product_availability: true,
    //   product_image: '',
    //   subcategory_id_fk: 1,
    //   seller_id_fk: 1,
    // },
    // {
    //   product_name: 'libro matematicas',
    //   product_stock: 1,
    //   product_description: 'Product 1 description',
    //   product_price: 100,
    //   product_availability: true,
    //   product_image: '',
    //   subcategory_id_fk: 1,
    //   seller_id_fk: 1,
    }], {

    })
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
