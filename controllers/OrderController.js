const {Order, Product, User} = require("../models");
/** CRUD ACTIONS FOR ORDER */

/** 
 * METHOD: POST
 * Create an order
*/

exports.createOrder = (req, res) => {
    //Try to create an order
    Order.create(req.body.order)
    .then(order => {
        //obtain all the products from cart
        const getProducts = req.body.products;
        getProducts.forEach(product => {
            //search if the product already exist
            Product.findOne(
                    {
                        where: {id: product.id}
                    }
                ).then(product => {
                    //ask for consistency of the seller and the buyer (not equal)
                if(product.seller_id_fk === req.body.order.buyer_id_fk){
                    return res.status(401).json({message: "You can't buy your own product"})
                }else{
                    //add the product to the order
                    order.setProduct(product)
                    //update the quantity
                    product.update({
                        product_stock: product.stock - req.body.product.quantity
                    }).then(() => {
                        return res.status(200).json({message: "Order created successfully"})
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

//Show all orders created by buyer
//Method: POST

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

//Show one order
//Method: GET

exports.getOneOrder = (req, res) => {
    Order.findOne({
        where: {
            id: req.query.id
        },
        include: [{
            model: Product,
            as: 'products',
            through: {
                attributes:[]
            }
        }]
    }).then(order => {
        res.status(200).json({message: "Order found", order: order})
    }).catch(err => {
        res.status(500).json({message: "Error finding order", error: err})
    })
}