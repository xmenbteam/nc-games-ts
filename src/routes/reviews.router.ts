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
import { handle405s } from "../errors";

const reviewsRouter: Router = express.Router();

reviewsRouter.route("/").get(getAllReviews).post(postReview).all(handle405s);
reviewsRouter
  .route("/:review_id")
  .get(getReviewById)
  .patch(patchReviewById)
  .delete(deleteReviewById)
  .all(handle405s);
reviewsRouter
  .route("/:review_id/comments")
  .get(getComments)
  .post(postComment)
  .all(handle405s);

export default reviewsRouter;
