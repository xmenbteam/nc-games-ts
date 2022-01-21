import express, { Router } from "express";
import {
  getAllReviews,
  getReviewById,
} from "../controllers/reviews.controller";

const reviewsRouter: Router = express.Router();

reviewsRouter.route("/").get(getAllReviews);
reviewsRouter.route("/:review_id").get(getReviewById);

export default reviewsRouter;
