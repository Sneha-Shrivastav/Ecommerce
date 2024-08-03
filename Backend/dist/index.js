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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./models/db")); // Import the Sequelize instance
require("./models/db/users"); // Import model definitions
require("./models/db/products");
require("./models/db/cart");
require("./models/db/cartItems");
require("./models/db/associations"); // Import associations setup
const user_1 = require("./controller/user/user");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({ message: "ok" });
}));
app.post('/signup', user_1.signUp);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
});
startServer();
