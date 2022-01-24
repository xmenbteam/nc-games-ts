import { Request, Response, NextFunction, request, response } from "express";
import {
  fetchAllReviews,
  fetchReviewById,
  removeReview,
  sendReview,
  updateReviewById,
} from "../models/reviews.model";
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

export const patchReviewById = async (
  { params, body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { inc_votes } = body;
    const { review_id } = params;

    const review = await updateReviewById(inc_votes, review_id);

    res.status(201).send({ review });
  } catch (err) {
    next(err);
  }
};

export const postReview = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const review = await sendReview(body);

    res.status(201).send({ review });
  } catch (err) {
    next(err);
  }
};

export const deleteReviewById = async (
  { params }: Request,
  res: Response,
  next: NextFunction
) => {
  const { review_id } = params;
  const reviewDeleter = removeReview(review_id)
    .then(() => res.status(204).send({ msg: "review deleted" }))
    .catch(next);

  await reviewDeleter;
};
