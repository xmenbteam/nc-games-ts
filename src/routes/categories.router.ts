import express, { Router } from "express";
import { getCategories } from "../controllers/categories.controller";

const categoriesRouter: Router = express.Router();

categoriesRouter.route("/").get(getCategories);

export default categoriesRouter;
