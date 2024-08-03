import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';
import User from './users'; 
import OrderItem from './orderItem';

interface OrderAttributes {
  id: number;
  userId: number;
  totalPrice: number;
  totalItems: number;
  totalQuantity: number;
  cancellable: boolean;
  status: string;
  deletedAt?: Date;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'cancellable' | 'status' | 'isDeleted'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public totalPrice!: number;
  public totalItems!: number;
  public totalQuantity!: number;
  public cancellable!: boolean;
  public status!: string;
  public deletedAt?: Date;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init({
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
  totalQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cancellable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  tableName: 'orders',
  timestamps: true,
});

Order.hasMany(OrderItem, { as: 'orderItems', foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { as: 'order', foreignKey: 'orderId' });

export default Order;
