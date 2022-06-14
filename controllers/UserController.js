const {User} = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const authConfig = require('../config/auth')
const { TokenExpiredError } = require("jsonwebtoken")
/**
 * funcion de registrar un usuario
 * ruta: POST /user/registerUser
 * introducir datos del json
 * @param {*} req 
 * @param {*} res 
 */
exports.registerUser = (req, res) => {
    
    User.create(req.body)
    .then(_user => {
        let token = jwt.sign({user:_user},"secret",{
            expiresIn:authConfig.expires
        });
    return res.status(201).json({ 
            message: "Usuario creado exitosamente",
            user: req.body,
            token: token
        });
        ///////////////
    }).
    //////////////////

    catch(err => { res.status(401).json(err)}) 
}


/** 
 * funcion para logearte por medio del email
 * ruta: POST /user/loginUser
 * hay que introducir de momento solo el email por medio de un json
 * @param {*} req
 * @param {*} res
*/
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                user_email: req.body.user_email,
            }
        })
        if (!user){
            res.status(400).json({
                message:"Usuario no encontrado"
            })
        }else{
            if (bcrypt.compareSync(req.body.user_password,user.user_password)){
               /////////////////////////
                let token = jwt.sign({user:user},authConfig.secret,{
                    expiresIn:authConfig.expires
                });
                return res.json({ message:"Login Correcto", user:user,
                    token:token
                })
                //////////////////////
            }else{
              return  res.status(403).json({message: "Contraseña incorrecta"})
            }
        }
    }catch(err) {
        res.status(500).json({
            message: "Error logging in user",
            error: err
        })
    }
}


/**
 * funcion que se le pasa por un json el usuario a editar y tambien los campos a editar
 * ruta: PUT /user/editUser
 * en el json a de ir primero 
 * @param {*} req 
 * @param {*} res 
 */
exports.editUser =(req, res) => {
    User.update(req.body, {
            where: {
                id: req.body.userId
            }
        }).then(_user => {
        res.status(200).json({message: "User updated successfully"})
    }).catch(err => {   
        res.status(500).json({
            message: "Error updating user",
            error: err
        })
    })
}


/**
 * funcion que te convierte en vendedor al usuario 
 * ruta: POST /user/convertToSeller
 * se ke paso un el userid y el paramatro de user_is_seller
 * @param {*} req 
 * @param {*} res 
 */
exports.convertToSeller = async (req, res) => {
    try {
        await User.update({
            user_is_seller: true,
        },{
            where: {
                id: req.body.userId
            }
        })
        const user = 
            await User.findByPk(req.body.userId, 
                {
                    attributes:
                    [
                        "user_is_seller", 
                        "user_is_buyer",
                        "user_roles",
                    ]
            })
        res.status(200).json({message: "User converted to seller successfully", user})
    }catch(err) {
        res.status(500).json({
            message: "Error converting to seller",
            error: err
        })
    }
}
/**
 * función para añadir foto de usuario
 * @param {*} req 
 * @param {*} res 
 */
exports.addProfilePhoto = async (req, res) => {
    User.update({
        user_profile_image: req.body.img,
    },
    {   
        where: {
            id: req.body.userId
        }
    }
    )
    .then(_user => {
        res.status(200).json({ message: "Foto actualizada correctamente" })
    }).catch(err => {
        res.status(500).json({
            message: "Error adding profile photo",
            error: err
        })
    })
}
/**
 * funcion de eliminar la photo de perfil
 * ruta: PUT /user/deletPhoto
 * se le pasa un userId y un parametro de user_profile_image
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteProfilePhoto = async (req, res) => {
    User.update({
        user_profile_image: null,
    },{
        where: {
            id: req.body.userId
        }
    }).then(_user => {
        res.status(200).json({ message: "Foto borrada correctamente" })
    }).catch(err => {
        res.status(500).json({
            message: "Error deleting profile photo",
            error: err
        })
    })
}



/** 
 * 
 * funcion que te devuelve un json con los datos del usuario simmplificados
 * ruta: POST /user/getMiniInfo
 * se le pasa un userId en un json 
 * @param {*} req
 * @param {*} res
*/
exports.getMiniInfo = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.body.userId
            },
            attributes: {
                exclude: [
                    "user_password", 
                    "user_is_seller", 
                    "user_is_buyer", 
                    "user_profile_image",
                    "created_at",
                    "updated_at"
                ]
            },
        })
        res.status(200).json({message: "User info retrieved successfully", user: user})
    }catch(err) {
        res.status(500).json({
            message: "Error getting user info",
            error: err
        })
    }
}

/**
 * Funcion para obtener todos los datos del usuario
 */
exports.getOneUser = async(req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.body.userId
            },
            attributes: {
                exclude: [
                    "user_password",
                    "created_at",
                    "updated_at"
                ]
            },
        })
        res.status(200).json({message: "Usuario obtenido correctamente", user: user})
    }catch(err) {
        res.status(500).json({
            message: "Error getting user info",
            error: err
        })
    }
}

