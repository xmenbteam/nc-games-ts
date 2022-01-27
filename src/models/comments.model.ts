import db from "../db/connection";
import { ReturnedCommentObj } from "../Types/api-returned-data-types";
import { CommentsParams } from "../Types/parameter-types";
import { checkIfValid, pageOffsetCalc } from "../Utils/util-functions";
import { sortByValues, orderByValues } from "../Utils/query-utils";
import { RawComment } from "../Types/raw-data-types";

export const fetchComments = async ({
  review_id,
  comment_id,
  sort_by = "created_at",
  order_by = "desc",
  limit = 10,
  page = 1,
}: CommentsParams): Promise<ReturnedCommentObj> => {
  const offset = pageOffsetCalc(page, limit);

  const values: any[] = [limit, offset];

  const isValidSortBy = checkIfValid(sort_by, sortByValues);
  const isValidOrderBy = checkIfValid(order_by, orderByValues);

  if (!isValidSortBy)
    return Promise.reject({
      status: 400,
      msg: `Invalid sort by column: ${sort_by}`,
    });

  if (!isValidOrderBy)
    return Promise.reject({
      status: 400,
      msg: `Invalid order by column: ${order_by}`,
    });

  let queryStr = `SELECT *, COUNT(*) OVER() :: INT AS full_count 
  FROM comments `;

  if (review_id) {
    queryStr += `WHERE review_id = $3 `;
    values.push(review_id);
  }

  if (comment_id) {
    queryStr += `WHERE comment_id = $3 `;
    values.push(comment_id);
  }

  queryStr += `ORDER BY ${sort_by} ${order_by}
  LIMIT $1 OFFSET $2;`;

  const comments = await db.query(queryStr, values);

  const returnedObj = {
    comments: comments.rows,
    currentPage: page,
    pageTotal: Math.ceil(comments.rows[0].full_count / limit),
  };

  return returnedObj;
};

export const sendComment = async (
  review_id: string,
  username: string,
  body: string
): Promise<RawComment> => {
  let queryStr = `INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *;`;
  const values = [review_id, username, body];

  const result = await db.query(queryStr, values);

  return result.rows[0];
};

export const updateComment = async (
  inc_votes: number,
  comment_id: string
): Promise<RawComment> => {
  const queryStr = `
  UPDATE comments
  SET votes = votes + $1
  WHERE comment_id = $2
  RETURNING *;
  `;
  const values = [inc_votes, comment_id];
  const result = await db.query(queryStr, values);

  return result.rows[0];
};

export const removeComment = async (comment_id: string) => {
  const queryStr = `
  DELETE FROM comments WHERE comment_id = $1`;
  const values = [comment_id];

  const result = await db.query(queryStr, values);
  // rowCount === number of deleted rows
  const { rowCount } = result;
  if (!rowCount)
    return Promise.reject({ status: 404, msg: "Comment not found!" });

  return result;
};
