const {Product, User} = require('../models');
const { Op } = require("sequelize");



/**
 * funcion que extrae todos los productos, descartando los del usuario que haga la busqueda
 * ruta: post /product/getAll
 * le pasamos un json con el id del usuario->"userId":10
 * @param {*} req 
 * @param {*} res 
 */

exports.getAllProducts = (req, res) => {
    Product.findAll({
        where: {
            seller_id_fk: {
                [Op.ne]: req.body.userId
            }
        },
        order: [
            ['createdAt','DESC']
        ],
        include: {
            model: User,
            attributes: [ 'user_name']
        }

    }).then((result) => {
        res.status(200).json(result);
    }).catch(err => {console.log(err)})
}


/**
 * funcion que muestra todos los productos que coincidan con el filtro de la categoria de producto y el rango de precios
 * ruta: post /product/getByFilter
 * le pasamos un json con el id del usuario y una query por la ruta como este ejemplo:
 * getByFilter?subcategory=5&min=5&max=150
 * @param {*} req 
 * @param {*} res 
 */
exports.getByFilter = async (req, res) => {
    try{
        let { subcategory, min, max } = req.query
        let newMin = min ? min : 1;
        let newMax = max ? max : 100000;
        const products = await Product.findAll({
            where: {
                subcategory_id_fk: subcategory,
                seller_id_fk: {
                    [Op.ne]: req.body.userId
                },
                product_price: {
                    [Op.between]: [newMin, newMax]
                }
            },
            include: {
                model: User,
                attributes: [ 'user_name']
            }
        });
       
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({
            message: "Error getting products by filter",
            error: err
        })
    }
}

/**
 * funcion de busqueda de un producto por su id
 * ruta: get /product/getOne/:id
 * @param {*} req 
 * @param {*} res 
 */
exports.getOneProduct =(req, res) => {
        Product.findByPk(req.params.id
            , {
            include: {
                model: User,
                attributes: [ 'user_name','user_lastname']
            }
        }
        ).then((result) => {
            

            res.status(200).json(result);

        }).catch(err => {console.log(err)})
    }



/**
 * funcion de crear un producto
 * ruta: post /product/createProduct
 * en el json se meteraan todos los datos relacionados con el producto
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
 * funcion de editar un producto, le pasamos el json con los datos que queremos cambiar
 * ruta: post /product/editProduct
 * en el json se introduciran todos los datos del producto que queremos cambiar
 * @param {*} req 
 * @param {*} res 
 */

exports.editProduct = async (req, res) => {
    try{
        await Product.update(
        {
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_price: req.body.product_price,
            product_stock: req.body.product_stock,
            subcategory_id_fk: req.body.subcategory_id_fk,
            product_availability: req.body.product_availability,
        }, 
        {where: 
            {
                id: req.body.productId
            }
        })
        res.status(201).json({message: "Product updated correctly"})
    
    }catch(err){
        res.status(500).json({
            message: "Error updating product",
            error: err
        })
    }
}


