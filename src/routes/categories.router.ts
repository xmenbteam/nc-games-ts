import express, { Router } from "express";
import {
  getCategories,
  postCategory,
} from "../controllers/categories.controller";

const categoriesRouter: Router = express.Router();

categoriesRouter.route("/").get(getCategories).post(postCategory);

export default categoriesRouter;
