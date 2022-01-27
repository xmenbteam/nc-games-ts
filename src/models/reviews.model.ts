import db from "../db/connection";
import {
  ReturnedReview,
  ReturnedReviewObj,
} from "../Types/api-returned-data-types";
import { fetchReviewsParams } from "../Types/parameter-types";
import { pageOffsetCalc } from "../Utils/util-functions";
import { sortByValues, orderByValues } from "../Utils/query-utils";
import { checkIfValid } from "../Utils/util-functions";
import { PostReview } from "../Types/post-data-types";

export const fetchReviewById = async (
  review_id: string
): Promise<ReturnedReview> => {
  let queryStr = `
  SELECT reviews.*, COUNT(comments.review_id) :: INT AS comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id
  WHERE reviews.review_id = $1
  GROUP BY reviews.review_id 
  LIMIT 1
  `;
  let values = [review_id];
  const response = await db.query(queryStr, values);
  const review = response.rows[0];
  if (!review) {
    return Promise.reject({ status: 404, msg: "Review Not Found!" });
  } else return review;
};

export const fetchAllReviews = async ({
  sort_by = "created_at",
  order_by = "desc",
  category,
  limit = 10,
  page = 1,
}: fetchReviewsParams): Promise<ReturnedReviewObj> => {
  const offset = pageOffsetCalc(page, limit);
  const values: any[] = [limit, offset];

  if (!checkIfValid(sort_by, sortByValues)) {
    return Promise.reject({
      status: 400,
      msg: `Invalid sort_by query: ${sort_by}`,
    });
  }
  if (!checkIfValid(order_by, orderByValues)) {
    return Promise.reject({
      status: 400,
      msg: `Invalid order_by query: ${order_by}`,
    });
  }

  let queryStr = ` 
  SELECT reviews.*, COUNT(comment_id) :: INT AS comment_count, 
  COUNT(*) OVER() :: INT AS full_count  
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id 
  `;

  if (category) {
    queryStr += `WHERE reviews.category = $3 `;
    values.push(category);
  }

  queryStr += `
  GROUP BY reviews.review_id
  ORDER BY ${sort_by} ${order_by} 
  LIMIT $1 OFFSET $2;`;

  const result = await db.query(queryStr, values);

  const reviews: ReturnedReview[] = result.rows;

  if (!reviews.length)
    return Promise.reject({ status: 404, msg: "Not found!" });

  const totalReviewsObject = {
    reviews,
    currentPage: page,
    pageTotal: Math.ceil(result.rows[0].full_count / limit),
  };

  return totalReviewsObject;
};

export const updateReviewById = async (
  inc_votes: number,
  review_id: string
): Promise<ReturnedReview> => {
  const queryStr = `
  UPDATE reviews
  SET votes = votes + $1
  WHERE review_id = $2
  RETURNING *;
  `;

  const values = [inc_votes, review_id];

  const result = await db.query(queryStr, values);

  const review = result.rows[0];

  if (!review) {
    return Promise.reject({
      status: 404,
      msg: "Review not found!",
    });
  }

  return review;
};

export const sendReview = async ({
  username,
  title,
  review_body,
  designer,
  category,
}: PostReview): Promise<ReturnedReview> => {
  if ([username, title, review_body, designer, category].some((el) => !el))
    return Promise.reject({ status: 400, msg: "Please fill in all fields!" });

  let queryStr = `INSERT INTO reviews (owner, title, review_body, designer, category)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  let values = [username, title, review_body, designer, category];

  const insertQuery = await db.query(queryStr, values);

  return insertQuery.rows[0];
};

export const removeReview = async (review_id: string) => {
  let queryStr = `DELETE FROM reviews * WHERE review_id = $1`;
  const values = [review_id];

  const result = await db.query(queryStr, values);

  return result.rows;
};
