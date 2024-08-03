import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'; 

interface Address {
    street: string;
    city: string;
    pincode: string;
}

interface UserAttributes {
    id: number;
    fname: string;
    lname: string;
    email: string;
    profileImage: string | null;
    phone: string;
    password: string;
    address: Address;
    role?: 'user' | 'superadmin';
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public fname!: string;
    public lname!: string;
    public email!: string;
    public profileImage!: string | null;
    public phone!: string;
    public password!: string;
    public address!: Address;
    public role?: 'user' | 'superadmin';
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'superadmin'),
        defaultValue: 'user',
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
});

export default User;
