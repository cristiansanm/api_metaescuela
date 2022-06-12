const {Order, Product, User, OrdersProducts} = require("../models");
const { Op } = require("sequelize");
/** CRUD ACTIONS FOR ORDER */




/**
 * Función para confirmar que el usuario existe
 * @param {*} req 
 * @param {*} res 
 */
const confirmBuyer = async(req, res) => {
    try{ 
        await User.findOne({
            where: { id: req.body.buyer_id_fk } 
        })
        return true;
    }catch(err){ 
        console.log(err)
        res.status(500).json({message: err})
        return false;
    }
}
/**
 * Confirma si tiene stock determinado producto
 */
const hasStock = async (req, res, product) => {
    try {
        await Product.findOne({
            where: {
                id: product.product_id_fk,
                product_stock:{
                    [Op.and]:{
                        [Op.eq]: 0,
                        [Op.lte]: product.product_quantity 
                    }
                    
                }
            }
        })
        return true;
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
        return false;
    }
}
/**
 * Función para validar si el comprador no se autocompra su propìo producto 
 */
const sameSeller = (buyer_id_fk, product) => {
    if(buyer_id_fk === product.seller_id_fk){
        return false;
    }
    return true;
}

/**
 * Funcion para actualizar la cantidad de productos según la cantidad solicitada
 */
const updateProductStock = async(req, res) => {
    try{
        const { product_id_fk, product_quantity } = req.body;
        const product = await Product.findOne({
            where: {
                id: product_id_fk
            }
        })
        await product.update({
            product_stock: product.product_stock - product_quantity
        })
        return true;
        
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
        return false;
    }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

/** 
 * METHOD: POST
 * Create an order
*/
exports.createOrder = (req, res) => {
    //intenta crearuna orden
    const { buyer_id_fk, order_total,products } = req.body;
    Order.create({ buyer_id_fk, order_total })
    .then(order => {
        //obtiene todos los productos del carrito
        const getProducts = products;
        getProducts.forEach(product => {
            //busca si el producto existe
            Product.findOne(
                    {
                        where: {id: product.product_id}
                    }
                ).then(Oneproduct =>{
                    //pregunta por la conssitentencia de si un vendedor se autocompre sus productos
                if(Oneproduct.seller_id_fk === buyer_id_fk){
                    return res.status(401).json({message: "You can't buy your own product"})
                }
                else{
                    
                    //agregar un producto a la orden 
                    OrdersProducts.create({
                        order_id_fk: order.id,
                        product_id_fk: Oneproduct.id,
                        product_quantity: product.product_quantity,
                        product_subtotal: Oneproduct.product_price * product.product_quantity
                    }).then(orderProduct => {
                        if (Oneproduct.product_stock < product.product_quantity) {
                            return res.status(401).json({message: "Not enough stock"})
                        }else if(Oneproduct.product_stock === 0){
                            return res.status(401).json({message: "Product out of stock"})
                        }
                        else{
                        //actualizar la cantidad de productos
                            console.log(Oneproduct.id, Oneproduct.product_stock - product.product_quantity )
                            Oneproduct.update({
                                product_stock: Oneproduct.product_stock - product.product_quantity
                            }).then(() => {
                                res.setHeader('Content-Type', 'application/json');
                                return res.status(200).json({ message: "Order created successfully" })
                            })
                        }
                    })

                }
            
            }).catch(err => {
                return res.status(500).json({message: "Error finding the product", error: err})
            })
        });

    })
    .catch(err => {
    res.status(500).json({
        message: "Error creating order",
        error: err
    });
    });
}


/**
 * lafuncion consiste en la busqueda de de la ordenes de un usuario 
 * ruta:post /order/getAll
 * el usuario se pasa por medio de un json
 * @param {*} req
 *  @param {*} res
 */

exports.getAllOrders = (req, res) => {
    
    Order.findAll({
        where: {
            buyer_id_fk: req.body.userId
        },
    }).then(orders => {
        res.status(200).json({message: "Orders found", orders: orders})
    }).catch(err => {
        res.status(500).json({message: "Error finding orders", error: err})
    })
}




/**
 * la funcion consiste en la busqueda de una orden en especifico
 * ruta:post /order/getOneOrder/:id
 * 
 * @param {*} req
 *  @param {*} res
 */
exports.getOneOrder = (req, res) => {
    Order.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Product,
            attributes: ['product_name', 'product_price', 'product_stock']
        
        }]
    }).then(order => {
        res.status(200).json({message: "Order found", order: order})
    }).catch(err => {
        res.status(500).json({message: "Error finding order", error: err})
    })
}