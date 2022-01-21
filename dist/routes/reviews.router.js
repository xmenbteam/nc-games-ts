"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("../controllers/reviews.controller");
const reviewsRouter = express_1.default.Router();
reviewsRouter.route("/").get(reviews_controller_1.getAllReviews);
reviewsRouter.route("/:review_id").get(reviews_controller_1.getReviewById);
exports.default = reviewsRouter;
