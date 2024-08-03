"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user/user");
// Import other controllers if needed
const router = (0, express_1.Router)();
// Define routes
router.post('/signup', user_1.signUp);
// Add other user-related routes here
// e.g., router.post('/login', login);
exports.default = router;
