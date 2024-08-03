import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'; 
import Product from './products'; 
import Cart from './cart'; 

interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id'> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
}

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cart,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  sequelize,
  tableName: 'cartItems',
  timestamps: true,
});

export default CartItem;
