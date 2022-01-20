import express, { Router } from "express";

import { getApi } from "../controllers/api.controller";
import categoriesRouter from "./categories.router";

const apiRouter: Router = express.Router();

apiRouter.route("/").get(getApi);
apiRouter.use("/categories", categoriesRouter);

export default apiRouter;
