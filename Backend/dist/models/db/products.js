"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            isDecimal: true,
        },
    },
    isFreeShipping: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    productImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    availableSizes: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
        validate: {
            isIn: [['S', 'XS', 'M', 'X', 'L', 'XXL', 'XL']],
        },
    },
    isDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_1.default,
    tableName: 'products',
    timestamps: true,
});
exports.default = Product;
