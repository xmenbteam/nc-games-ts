import express, { Router } from "express";

import { getUsers, postUser } from "../controllers/users.controllers";

const usersRouter: Router = express.Router();

usersRouter.route("/").get(getUsers).post(postUser);
usersRouter.route("/:username").get(getUsers);

export default usersRouter;
