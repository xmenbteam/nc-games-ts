import db from "../db/connection";
import { RawCategory } from "../Types/raw-data-types";

export const fetchCategories = async (): Promise<RawCategory[]> => {
  const categories = await db.query(`SELECT * FROM categories`);
  return categories.rows;
};
