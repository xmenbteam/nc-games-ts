"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controller_1 = require("../controllers/comments.controller");
const reviews_controller_1 = require("../controllers/reviews.controller");
const errors_1 = require("../errors");
const reviewsRouter = express_1.default.Router();
reviewsRouter.route("/").get(reviews_controller_1.getAllReviews).post(reviews_controller_1.postReview).all(errors_1.handle405s);
reviewsRouter
    .route("/:review_id")
    .get(reviews_controller_1.getReviewById)
    .patch(reviews_controller_1.patchReviewById)
    .delete(reviews_controller_1.deleteReviewById)
    .all(errors_1.handle405s);
reviewsRouter
    .route("/:review_id/comments")
    .get(comments_controller_1.getComments)
    .post(comments_controller_1.postComment)
    .all(errors_1.handle405s);
exports.default = reviewsRouter;
