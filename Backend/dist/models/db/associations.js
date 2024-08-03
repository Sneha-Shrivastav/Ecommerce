"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const products_1 = __importDefault(require("./products"));
const cart_1 = __importDefault(require("./cart"));
const cartItems_1 = __importDefault(require("./cartItems"));
const order_1 = __importDefault(require("./order"));
const orderItem_1 = __importDefault(require("./orderItem"));
// Define associations
users_1.default.hasMany(cart_1.default, {
    foreignKey: 'userId',
    as: 'carts',
});
cart_1.default.belongsTo(users_1.default, {
    foreignKey: 'userId',
    as: 'user',
});
cart_1.default.hasMany(cartItems_1.default, {
    foreignKey: 'cartId',
    as: 'items',
});
cartItems_1.default.belongsTo(cart_1.default, {
    foreignKey: 'cartId',
});
cartItems_1.default.belongsTo(products_1.default, {
    foreignKey: 'productId',
});
products_1.default.hasMany(cartItems_1.default, {
    foreignKey: 'productId',
    as: 'cartItems',
});
order_1.default.hasMany(orderItem_1.default, {
    foreignKey: 'orderId',
    as: 'items',
});
orderItem_1.default.belongsTo(order_1.default, {
    foreignKey: 'orderId',
});
orderItem_1.default.belongsTo(products_1.default, {
    foreignKey: 'productId',
});
