import express, { Router } from "express";
import {
  deleteComment,
  getComments,
  patchComment,
} from "../controllers/comments.controller";
import { handle405s } from "../errors";

const commentsRouter: Router = express.Router();

commentsRouter.route("/").get(getComments).all(handle405s);
commentsRouter
  .route("/:comment_id")
  .get(getComments)
  .patch(patchComment)
  .delete(deleteComment)
  .all(handle405s);

export default commentsRouter;
