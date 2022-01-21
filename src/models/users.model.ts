import { RawUser } from "../Types/raw-data-types";

import db from "../db/connection";

export const fetchUsers = async (username?: string): Promise<RawUser[]> => {
  const values = [];

  let queryStr = `SELECT `;

  if (username) {
    queryStr += `username, avatar_url, name `;
  } else {
    queryStr += `username `;
  }

  queryStr += `FROM users `;

  if (username) {
    queryStr += `WHERE username = $1;`;
    values.push(username);
  } else queryStr += `;`;

  const result = await db.query(queryStr, values);

  if (result.rows.length === 0)
    return Promise.reject({ status: 404, msg: "Oh dear! User not found!" });

  return result.rows;
};

export const sendUser = async ({
  username,
  name,
  avatar_url,
}: RawUser): Promise<RawUser> => {
  const values = [username, name, avatar_url];
  const queryStr = `INSERT INTO users (username, name, avatar_url) VALUES ($1, $2, $3) RETURNING *`;

  const result = await db.query(queryStr, values);

  return result.rows[0];
};
