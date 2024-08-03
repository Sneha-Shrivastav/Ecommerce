"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
const env = process.env.NODE_ENV || 'development';
const dbConfig = config_1.default[env];
const sequelize = new sequelize_typescript_1.Sequelize({
    database: dbConfig.database,
    dialect: dbConfig.dialect,
    username: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    models: [__dirname + '/models'], // Adjust if your models are in a different directory
    // Optionally, you can add other Sequelize options here
});
exports.default = sequelize;
