import express, { Router } from "express";
import {
  getCategories,
  postCategory,
} from "../controllers/categories.controller";
import { handle405s } from "../errors";

const categoriesRouter: Router = express.Router();

categoriesRouter
  .route("/")
  .get(getCategories)
  .post(postCategory)
  .all(handle405s);

export default categoriesRouter;
