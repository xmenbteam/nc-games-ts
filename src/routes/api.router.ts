import express, { Router } from "express";

import { getApi } from "../controllers/api.controller";
import categoriesRouter from "./categories.router";
import commentsRouter from "./comments.router";
import reviewsRouter from "./reviews.router";
import usersRouter from "./users.router";

const apiRouter: Router = express.Router();

apiRouter.route("/").get(getApi);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);

export default apiRouter;
