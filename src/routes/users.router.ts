import express, { Router } from "express";

import { getUsers, postUser } from "../controllers/users.controllers";
import { handle405s } from "../errors";

const usersRouter: Router = express.Router();

usersRouter.route("/").get(getUsers).post(postUser).all(handle405s);
usersRouter.route("/:username").get(getUsers).all(handle405s);

export default usersRouter;
