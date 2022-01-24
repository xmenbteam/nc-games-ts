import { Request, Response, NextFunction } from "express";
import {
  fetchComments,
  sendComment,
  updateComment,
} from "../models/comments.model";
import { ReturnedCommentObj } from "../Types/api-returned-data-types";
import {
  fetchCommentsParams,
  fetchCommentsQuery,
} from "../Types/parameter-types";

export const getComments = async (
  { query, params }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sort_by, order_by, limit, page }: fetchCommentsQuery = query;
    const { review_id, comment_id }: fetchCommentsParams = params;
    const response = await fetchComments({
      review_id,
      comment_id,
      sort_by,
      order_by,
      limit,
      page,
    });

    res
      .status(200)
      .send({ comments: response.comments, pages: response.pageTotal });
  } catch (err) {
    next(err);
  }
};

export const postComment = (
  { params, body: commentBody }: Request,
  res: Response,
  next: NextFunction
) => {
  const { review_id } = params;
  const { username, body } = commentBody;
  sendComment(review_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

export const patchComment = async (
  { params, body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { comment_id } = params;
    const { inc_votes } = body;

    const comment = await updateComment(inc_votes, comment_id);

    res.status(200).send({ comment });
  } catch (err) {
    next(err);
  }
};

// export const deleteComment = ({ params }, res, next) => {
//   const { comment_id } = params;

//   removeComment(comment_id)
//     .then(() => res.status(204).send({ msg: "comment deleted" }))
//     .catch(next);
// };
