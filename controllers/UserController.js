const User = require("../models/User.js")

/** CRUD ACTIONS FOR USER */

//Register a user 
/**
 * METHOD: POST
 * @param {*} req 
 * @param {*} res 
 */
exports.registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            message: "User created successfully",
            user: user
        })
    }catch(err) {
        res.status(500).json({
            message: "Error creating user",
            error: err
        })
    }
}

//Login a user
/** 
 * METHOD: POST
*/
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                user_email: req.body.user_email,
            }
        })
        res.status(200).json({message: "User logged in successfully", user: user})
    }catch(err) {
        res.status(500).json({
            message: "Error logging in user",
            error: err
        })
    }
}

//Edit user info 
/**
 * MEHTOD: PUT
 * @param {*} req 
 * @param {*} res 
 */
exports.editUser = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.body.userId
            }
        })
        res.status(200).json({message: "User updated successfully"})
    }catch(err) {
        res.status(500).json({
            message: "Error updating user",
            error: err
        })
    }
}
//Convert to seller
exports.convertToSeller = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.body.userId
            }
        })
        res.status(200).json({message: "User converted to seller successfully"})
    }catch(err) {
        res.status(500).json({
            message: "Error converting to seller",
            error: err
        })
    }
}

//Delete profile photo
/**
 * METHOD: PUT
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteProfilePhoto = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.body.userId
            }
        })
    }catch(err) {
        res.status(500).json({
            message: "Error deleting profile photo",
            error: err
        })
    }
}

/** 
 * Get simplified user info
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
 