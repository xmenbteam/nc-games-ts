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
exports.deleteReviewById = exports.postReview = exports.patchReviewById = exports.getAllReviews = exports.getReviewById = void 0;
const reviews_model_1 = require("../models/reviews.model");
const getReviewById = ({ params }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { review_id } = params;
        const review = yield (0, reviews_model_1.fetchReviewById)(review_id);
        res.status(200).send({ review });
    }
    catch (err) {
        next(err);
    }
});
exports.getReviewById = getReviewById;
const getAllReviews = ({ query }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sort_by, order_by, category, limit, page } = query;
        const result = yield (0, reviews_model_1.fetchAllReviews)({
            sort_by,
            order_by,
            category,
            limit,
            page,
        });
        res.status(200).send(result);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllReviews = getAllReviews;
const patchReviewById = ({ params, body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inc_votes } = body;
        const { review_id } = params;
        const review = yield (0, reviews_model_1.updateReviewById)(inc_votes, review_id);
        res.status(201).send({ review });
    }
    catch (err) {
        next(err);
    }
});
exports.patchReviewById = patchReviewById;
const postReview = ({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield (0, reviews_model_1.sendReview)(body);
        res.status(201).send({ review });
    }
    catch (err) {
        next(err);
    }
});
exports.postReview = postReview;
const deleteReviewById = ({ params }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { review_id } = params;
    const reviewDeleter = (0, reviews_model_1.removeReview)(review_id)
        .then(() => res.status(204).send({ msg: "review deleted" }))
        .catch(next);
    yield reviewDeleter;
});
exports.deleteReviewById = deleteReviewById;
