import { Request, Response, NextFunction } from "express";
import { fetchAllReviews, fetchReviewById } from "../models/reviews.model";
import { fetchReviewsParams } from "../Types/parameter-types";

export const getReviewById = async (
  { params }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { review_id } = params;
    const review = await fetchReviewById(review_id);
    res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};

export const getAllReviews = async (
  { query }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sort_by, order_by, category, limit, page }: fetchReviewsParams =
      query;
    const result = await fetchAllReviews({
      sort_by,
      order_by,
      category,
      limit,
      page,
    });
    res.status(200).send({ reviews: result.reviews, pages: result.pageTotal });
  } catch (err) {
    next(err);
  }
};
