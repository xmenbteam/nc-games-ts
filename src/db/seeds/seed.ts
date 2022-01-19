const format = require("pg-format");

import db from "../connection";
import { dropTables, createTables } from "../../Utils/manage-tables";
import {
  rawComment,
  rawCategory,
  rawReview,
  rawUser,
} from "../../Types/raw-data-types";
import {
  categoryDataFormatter,
  userDataFormatter,
  reviewDataFormatter,
  commentDataFormatter,
} from "../../Utils/seed-utils";

export const seed = async (
  categoryData: rawCategory[],
  commentData: rawComment[],
  reviewData: rawReview[],
  userData: rawUser[]
) => {
  await dropTables();
  await createTables();

  const insertIntoCategories = format(
    `
  INSERT INTO categories 
      (slug, description)
      VALUES
      %L
      RETURNING *;
  `,
    categoryDataFormatter(categoryData)
  );

  const categoryQuery = await db.query(insertIntoCategories);
  const categories = categoryQuery.rows;

  const insertIntoUsers = format(
    `
      INSERT INTO users 
      (username, avatar_url, name)
      VALUES
      %L
      RETURNING *;`,
    userDataFormatter(userData)
  );

  const users = db.query(insertIntoUsers).then((result: any) => result.rows);

  await Promise.all([categories, users]);

  const insertIntoReviews = format(
    `
      INSERT INTO reviews 
      (
        title,
        review_body,
        designer,
        review_img_url,
        votes,
        category,
        owner,
        created_at
        )
      VALUES
      %L
      RETURNING *;`,
    reviewDataFormatter(reviewData)
  );

  await db.query(insertIntoReviews).then((result: any) => result.rows);

  const insertIntoComments = format(
    `
      INSERT INTO comments
      (
        author, 
        review_id,
        votes, 
        created_at, 
        body
        )
        VALUES
      %L
      RETURNING *;`,
    commentDataFormatter(commentData)
  );

  return db.query(insertIntoComments).then((result: any) => result.rows);
};
