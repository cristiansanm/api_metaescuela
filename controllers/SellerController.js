const {Product, Order, User }= require("../models")
const { QueryTypes } = require('sequelize');

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
            },
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
 * funncion que obtiene todos los productos publicados por un vendedor
 * ruta:post /seller/getSoldProducts
 * @param {*} req 
 * @param {*} res 
 */
exports.getSoldProductsForSeller = async (req, res) => {
    Product.findAll({
            where: {
                seller_id_fk: req.body.userId,
                
        }, include: [{
            model: Order,
            attributes: ["buyer_id_fk", "order_total", "id"],
            include: [{
                model: User,
                attributes: ["user_name", "id"]
            }]
        }]
    }).then((result) => {
        res.status(200).json(result);
    }   ).catch(err => {console.log(err)})

}

/**
 * Función para obtener las ganancias totales
 */