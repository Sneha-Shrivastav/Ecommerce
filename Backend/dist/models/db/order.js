"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db")); // Adjust the path to your database configuration
const users_1 = __importDefault(require("./users")); // Adjust the path to your user model
class Order extends sequelize_1.Model {
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users_1.default,
            key: 'id',
        },
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    totalItems: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    totalQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cancellable: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'completed', 'canceled'),
        defaultValue: 'pending',
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    isDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_1.default,
    tableName: 'orders',
    timestamps: true,
});
exports.default = Order;
