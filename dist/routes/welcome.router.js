"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const welcome_controller_1 = require("../controllers/welcome.controller");
const welcomeRouter = express_1.default.Router();
welcomeRouter.route("/").get(welcome_controller_1.getWelcome);
exports.default = welcomeRouter;
