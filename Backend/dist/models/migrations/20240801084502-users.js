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
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
// Define migration functions
const up = (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryInterface.createTable('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        fname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        profileImage: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: sequelize_1.DataTypes.JSONB,
            allowNull: false
        },
        role: {
            type: sequelize_1.DataTypes.ENUM('user', 'superadmin'),
            defaultValue: 'user'
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE
        }
    });
});
exports.up = up;
const down = (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryInterface.dropTable('users');
});
exports.down = down;
