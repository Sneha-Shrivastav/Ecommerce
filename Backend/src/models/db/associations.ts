import User from './users';
import Product from './products';
import Cart from './cart';
import CartItem from './cartItems';
import Order from './order';
import OrderItem from './orderItem';

// Define associations
User.hasMany(Cart, {
    foreignKey: 'userId',
    as: 'carts',
});
Cart.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

Cart.hasMany(CartItem, {
    foreignKey: 'cartId',
    as: 'items',
});
CartItem.belongsTo(Cart, {
    foreignKey: 'cartId',
});

CartItem.belongsTo(Product, {
    foreignKey: 'productId',
});
Product.hasMany(CartItem, {
    foreignKey: 'productId',
    as: 'cartItems',
});

Order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    as: 'items',
});
OrderItem.belongsTo(Order, {
    foreignKey: 'orderId',
});
OrderItem.belongsTo(Product, {
    foreignKey: 'productId',
});