import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'; 

interface ProductAttributes {
    id: number;
    title: string;
    description: string;
    price: number;
    isFreeShipping: boolean;
    productImage: string;
    category?: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'isFreeShipping' | 'isDeleted'> {}
  
  class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public price!: number;
    public isFreeShipping!: boolean;
    public productImage!: string;
    public category?: string;
    public isDeleted!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    isFreeShipping: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    productImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    tableName: 'products',
    timestamps: true,
  });
  
  export default Product;