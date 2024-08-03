"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db")); // Adjust the path to your database configuration
const products_1 = __importDefault(require("./products")); // Adjust the path to your product model
const cart_1 = __importDefault(require("./cart")); // Adjust the path to your cart model
class CartItem extends sequelize_1.Model {
}
CartItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cartId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: cart_1.default,
            key: 'id',
        },
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: products_1.default,
            key: 'id',
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize: db_1.default,
    tableName: 'cartItems',
    timestamps: true,
});
exports.default = CartItem;
