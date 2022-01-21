import db from "../db/connection";
import {
  ReturnedReview,
  ReturnedReviewObj,
} from "../Types/api-returned-data-types";
import { fetchReviewsParams } from "../Types/parameter-types";
import { pageOffsetCalc } from "../Utils/util-functions";
import { sortByValues, orderByValues } from "../Utils/query-utils";
import { checkIfValid } from "../Utils/util-functions";

export const fetchReviewById = async (
  review_id: any
): Promise<ReturnedReview> => {
  let queryStr = `
  SELECT reviews.*, COUNT(comments.review_id) :: INT AS comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id
  WHERE comments.review_id = $1
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

  const totalReviewsObject = {
    reviews,
    pageTotal: Math.ceil(result.rows[0].full_count / limit),
  };

  return totalReviewsObject;
};
