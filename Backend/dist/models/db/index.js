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
exports.User = exports.sequelize = void 0;
const db_1 = __importDefault(require("../db"));
exports.sequelize = db_1.default;
const users_1 = __importDefault(require("./users"));
exports.User = users_1.default;
// Import other models here
// import Product from './product';
// import Order from './order';
require("./associations"); // This will call the associations
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.sync({ force: false }); // Set to true to drop and recreate tables
        console.log('Database & tables created!');
    }
    catch (error) {
        console.error('Unable to create the database:', error);
    }
});
initializeDatabase();
