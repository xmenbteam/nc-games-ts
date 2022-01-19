import {
  commentData,
  reviewData,
  userData,
  categoryData,
} from "../data/development-data/index.js";
import { seed } from "./seed";
import db from "../connection.js";

const runSeed = async () => {
  await seed(categoryData, commentData, reviewData, userData);
  await db.end();
};

runSeed();
