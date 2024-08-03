"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    profileImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
        validate: {
            isAddress(value) {
                const requiredFields = ['street', 'city', 'pincode'];
                if (!value.shipping || !value.billing) {
                    throw new Error('Address must include shipping and billing details');
                }
                requiredFields.forEach(field => {
                    if (!value.shipping[field] || !value.billing[field]) {
                        throw new Error(`Address must include ${field} in shipping and billing`);
                    }
                });
            },
        },
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('user', 'superadmin'),
        defaultValue: 'user',
    },
}, {
    sequelize: db_1.default,
    tableName: 'users',
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            user.password = yield bcrypt_1.default.hash(user.password, 10);
        }),
    },
    timestamps: true,
});
exports.default = User;
