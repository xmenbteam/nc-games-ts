"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_controller_1 = require("../controllers/api.controller");
const categories_router_1 = __importDefault(require("./categories.router"));
const comments_router_1 = __importDefault(require("./comments.router"));
const reviews_router_1 = __importDefault(require("./reviews.router"));
const users_router_1 = __importDefault(require("./users.router"));
const apiRouter = express_1.default.Router();
apiRouter.route("/").get(api_controller_1.getApi);
apiRouter.use("/categories", categories_router_1.default);
apiRouter.use("/reviews", reviews_router_1.default);
apiRouter.use("/users", users_router_1.default);
apiRouter.use("/comments", comments_router_1.default);
exports.default = apiRouter;
