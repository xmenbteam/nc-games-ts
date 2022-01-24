"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.patchComment = exports.postComment = exports.getComments = void 0;
const comments_model_1 = require("../models/comments.model");
const getComments = ({ query, params }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sort_by, order_by, limit, page } = query;
        const { review_id, comment_id } = params;
        const response = yield (0, comments_model_1.fetchComments)({
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
    }
    catch (err) {
        next(err);
    }
});
exports.getComments = getComments;
const postComment = ({ params, body: commentBody }, res, next) => {
    const { review_id } = params;
    const { username, body } = commentBody;
    (0, comments_model_1.sendComment)(review_id, username, body)
        .then((comment) => {
        res.status(201).send({ comment });
    })
        .catch(next);
};
exports.postComment = postComment;
const patchComment = ({ params, body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment_id } = params;
        const { inc_votes } = body;
        const comment = yield (0, comments_model_1.updateComment)(inc_votes, comment_id);
        res.status(200).send({ comment });
    }
    catch (err) {
        next(err);
    }
});
exports.patchComment = patchComment;
const deleteComment = ({ params }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment_id } = params;
        yield (0, comments_model_1.removeComment)(comment_id);
        res.status(204).send({ msg: "Comment deleted" });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteComment = deleteComment;
