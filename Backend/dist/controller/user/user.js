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
exports.signUp = void 0;
const users_1 = __importDefault(require("../../models/db/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fname, lname, email, profileImage, phone, password, address, role } = req.body;
        // Check if the user already exists by email or phone
        const existingUser = yield users_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const existingPhoneUser = yield users_1.default.findOne({ where: { phone } });
        if (existingPhoneUser) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create the user
        const newUser = yield users_1.default.create({
            fname,
            lname,
            email,
            profileImage,
            phone,
            password: hashedPassword,
            address,
            role,
        });
        return res.status(201).json({ message: `Hello ${newUser.email}` });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.signUp = signUp;
