import express, { Router } from "express";
import {
  deleteComment,
  getComments,
  patchComment,
} from "../controllers/comments.controller";

const commentsRouter: Router = express.Router();

commentsRouter.route("/").get(getComments);
commentsRouter
  .route("/:comment_id")
  .get(getComments)
  .patch(patchComment)
  .delete(deleteComment);

export default commentsRouter;
