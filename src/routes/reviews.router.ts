import express, { Router } from "express";
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

export default reviewsRouter;
