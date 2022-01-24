import express, { Router } from "express";
import { getComments, patchComment } from "../controllers/comments.controller";

const commentsRouter: Router = express.Router();

commentsRouter.route("/").get(getComments);
commentsRouter.route("/:comment_id").get(getComments).patch(patchComment);

export default commentsRouter;
