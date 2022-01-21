import express, { Router } from "express";

import { getApi } from "../controllers/api.controller";
import categoriesRouter from "./categories.router";
import reviewsRouter from "./reviews.router";
import usersRouter from "./users.router";

const apiRouter: Router = express.Router();

apiRouter.route("/").get(getApi);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/users", usersRouter);

export default apiRouter;
