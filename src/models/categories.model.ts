import db from "../db/connection";
import { RawCategory } from "../Types/raw-data-types";

export const fetchCategories = async (): Promise<RawCategory[]> => {
  const categories = await db.query(`SELECT * FROM categories`);
  return categories.rows;
};

export const sendCategory = async (
  slug: string,
  description: string
): Promise<RawCategory> => {
  const result = await db.query(
    `INSERT INTO categories (slug, description) VALUES ($1, $2) RETURNING *`,
    [slug, description]
  );

  return result.rows[0];
};
