'use strict';
const bcrypt = require('bcrypt');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //Many products belgong to one Users
            User.hasMany(models.Product, { foreignKey: 'seller_id_fk' })

            //One user can have many orders
            User.hasMany(models.Order, { foreignKey: 'buyer_id_fk' })

        }
    }
    User.init({
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

                is: {
                    args:
                        /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
                        msg:"Tiene que contener solo carácteres alfabéticos."

                }
            }
        },
        user_lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args:
                        /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
                        msg:"Tiene que contener solo carácteres alfabéticos."

                }
            }
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Email already exists"
            },
            validate: {
                isEmail: {
                    msg: "Invalid email"
                }
            }
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: 8,
                    msg: "Password must be at least 8 characters"
                }
            },
            set(value) {
                const salt = bcrypt.genSaltSync(12);
                const hash = bcrypt.hashSync(value, salt);
                this.setDataValue('user_password', hash);
            }
        },
        user_phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: "Only numbers are allowed"
                },
                min: {
                    args: 9,
                    msg: "Phone number must be at least 9 digits"
                }
            }
        },
        user_grade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_is_seller: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        user_is_buyer: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        user_roles: {
            type: DataTypes.VIRTUAL,
            get() {
                let isUser = this.getDataValue('user_is_buyer') ? "BUYER" : null;
                let isSeller = this.getDataValue('user_is_seller') ? "SELLER" : null;
                return [isUser, isSeller];
            }
        },
        user_profile_image: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        underscored: true,
        tableName: 'users',
        modelName: 'User',
        timestamps: false
    });
    return User;
};