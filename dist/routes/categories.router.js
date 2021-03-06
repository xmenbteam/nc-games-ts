"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("../controllers/categories.controller");
const errors_1 = require("../errors");
const categoriesRouter = express_1.default.Router();
categoriesRouter
    .route("/")
    .get(categories_controller_1.getCategories)
    .post(categories_controller_1.postCategory)
    .all(errors_1.handle405s);
exports.default = categoriesRouter;
