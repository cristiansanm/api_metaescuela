const Product = require("../models/Product.js")
const Order = require("../models/Order.js")


/**
 * Function to get all products searching by seller ID
 * Method: POST
 * @param {*} req 
 * @param {*} res 
 */
 exports.getProductsForSeller = async (req, res) => {
    try{
        const products = await Product.findAll({
            where: {
                seller_id_fk: req.body.userId
            },
        });
        (products.length === 0) ? 
            res.status(404).json({message: "No products found for seller"}):
            res.status(200).json(products);
    }catch(err){
        res.status(500).json({
            message: "Error getting products for seller",
            error: err
        })
    }
}

/**
 * Getting sold products by seller ID, besides show the buyer info
 * Method: POST
 * @param {*} req 
 * @param {*} res 
 */
exports.getSoldProductsForSeller = async (req, res) => {
    try{
        const products = await Product.findAll({
            where: {
                seller_id_fk: req.body.userId,
                include:[{
                    model: Order, 
                    as: "orders",
                    through: {
                        attributes: []
                    }
                }]
            }
        });
        (products.length === 0) ? 
            res.status(404).json({message: "No sold products found for seller"}):
            res.status(200).json(products);
    }catch(err){
        res.status(500).json({
            message: "Error getting sold products for seller",
            error: err
        })
    }
}