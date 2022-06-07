const {Product} = require('../models');
const { Op } = require("sequelize");

/** CRUD ACTIONS FOR PRODUCTS */

//Get all products 
/**
 * Function to get every prodyct while the user ID is not equal tu buyer Id 
 * (avoiding user autobuy their own products) 
 * method: post
 * */
exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.findAll({
            where: {
                buyer_id_fk: {
                    [Op.ne]: req.body.userId
                },
            }
        });
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({
            message: "Error getting all products",
            error: err
        })
    }
}

//Get by filter
/**
 * Function to get an array with products filtered by custom parameters
 * METHOD: POST
 * @param {*} req 
 * @param {*} res 
 */
exports.getByFilter = async (req, res) => {
    try{
        let { subcategory, min, max } = req.query
        const products = await Product.findAll({
            where: {
                subcategory_id_fk: subcategory,
                buyer_id_fk: {
                    [Op.ne]: req.body.userId
                },
                price: {
                [Op.between]: [min, max]
                }
            }
        });
        (products.length === 0) ?
            res.status(404).json({message: "No products found"}):
            res.status(200).json(products);
    }catch(err){
        res.status(500).json({
            message: "Error getting products by filter",
            error: err
        })
    }
}

//Get by id
/**
 * Function to get one product by its ID
 * METHOD: GET
 * @param {*} req 
 * @param {*} res 
 */
exports.getOneProduct = async (req, res) => {
    try{
        const product = await Product.findByPk(req.query.id);
        (product === null) ? 
            res.status(404).json({message: "No product found"}):
            res.status(200).json(product);
    }catch(err){
        res.status(500).json({
            message: "Error getting product by id",
            error: err
        })
    }
}

//Create a product
/**
 * Function for create a product, it should recive the same parameters as the model
 * METHOD: POST
 * @param {*} req 
 * @param {*} res 
 */
exports.createProduct = async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json({message: "Product created correctly",product: product});
    }catch(err){
        res.status(500).json({
            message: "Error creating product",
            error: err
        })
    }
}

/**
 * Edit product
 * METHOD: PUT
 * @param {*} req 
 * @param {*} res 
 */

exports.editProduct = async (req, res) => {
    try{
        const product = await Product.findByPk(req.query.id);
        (product === null) ? 
            res.status(404).json({message: "No product found"}):
            await product.update(req.body);
        res.status(200).json({message: "Product updated correctly", product: product});
    }catch(err){
        res.status(500).json({
            message: "Error updating product",
            error: err
        })
    }
}


