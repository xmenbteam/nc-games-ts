import express, { Router } from "express";
import {
  getComments,
  patchComment,
  postComment,
} from "../controllers/comments.controller";
import {
  deleteReviewById,
  getAllReviews,
  getReviewById,
  patchReviewById,
  postReview,
} from "../controllers/reviews.controller";

const reviewsRouter: Router = express.Router();

reviewsRouter.route("/").get(getAllReviews).post(postReview);
reviewsRouter
  .route("/:review_id")
  .get(getReviewById)
  .patch(patchReviewById)
  .delete(deleteReviewById);
reviewsRouter.route("/:review_id/comments").get(getComments).post(postComment);

export default reviewsRouter;
