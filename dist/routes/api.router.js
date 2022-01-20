"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_controller_1 = require("../controllers/api.controller");
const categories_router_1 = __importDefault(require("./categories.router"));
const apiRouter = express_1.default.Router();
apiRouter.route("/").get(api_controller_1.getApi);
apiRouter.use("/categories", categories_router_1.default);
exports.default = apiRouter;
