const {Product, Order }= require("../models")


/**
 * Funccion que te trae todos los productos de un vendedor
 * ruta:post /seller/getAllProducts
 * se le pasa un json que solo contenga el id del usuario
 * @param {*} req 
 * @param {*} res 
 */
exports.getProductsForSeller = async (req, res) => {
    try{
        const products = await Product.findAll({
            where: {
                seller_id_fk: req.body.userId
            }
            ,
            order: [
                ['createdAt', 'DESC']
            ]
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
 * ruta:post /seller/getSoldProducts
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