"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("../controllers/users.controllers");
const usersRouter = express_1.default.Router();
usersRouter.route("/").get(users_controllers_1.getUsers).post(users_controllers_1.postUser);
usersRouter.route("/:username").get(users_controllers_1.getUsers);
exports.default = usersRouter;
