import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'; 
import User from './users'; 
import CartItem from './cartItems'; 

interface CartAttributes {
  id: number;
  userId: number;
  totalPrice: number;
  totalItems: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: number;
  public userId!: number;
  public totalPrice!: number;
  public totalItems!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  totalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  totalItems: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'carts',
  timestamps: true,
});

Cart.hasMany(CartItem, { as: 'cartItems', foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { as: 'cart', foreignKey: 'cartId' });

export default Cart;
