import db from "../db/connection";

export const fetchCategories = async () => {
  const categories = await db.query(`SELECT * FROM categories`);
  return categories.rows;
};
