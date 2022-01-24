"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controller_1 = require("../controllers/comments.controller");
const errors_1 = require("../errors");
const commentsRouter = express_1.default.Router();
commentsRouter.route("/").get(comments_controller_1.getComments).all(errors_1.handle405s);
commentsRouter
    .route("/:comment_id")
    .get(comments_controller_1.getComments)
    .patch(comments_controller_1.patchComment)
    .delete(comments_controller_1.deleteComment)
    .all(errors_1.handle405s);
exports.default = commentsRouter;
