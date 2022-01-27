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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReview = exports.sendReview = exports.updateReviewById = exports.fetchAllReviews = exports.fetchReviewById = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const util_functions_1 = require("../Utils/util-functions");
const query_utils_1 = require("../Utils/query-utils");
const util_functions_2 = require("../Utils/util-functions");
const fetchReviewById = (review_id) => __awaiter(void 0, void 0, void 0, function* () {
    let queryStr = `
  SELECT reviews.*, COUNT(comments.review_id) :: INT AS comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id
  WHERE reviews.review_id = $1
  GROUP BY reviews.review_id 
  LIMIT 1
  `;
    let values = [review_id];
    const response = yield connection_1.default.query(queryStr, values);
    const review = response.rows[0];
    if (!review) {
        return Promise.reject({ status: 404, msg: "Review Not Found!" });
    }
    else
        return review;
});
exports.fetchReviewById = fetchReviewById;
const fetchAllReviews = ({ sort_by = "created_at", order_by = "desc", category, limit = 10, page = 1, }) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (0, util_functions_1.pageOffsetCalc)(page, limit);
    const values = [limit, offset];
    if (!(0, util_functions_2.checkIfValid)(sort_by, query_utils_1.sortByValues)) {
        return Promise.reject({
            status: 400,
            msg: `Invalid sort_by query: ${sort_by}`,
        });
    }
    if (!(0, util_functions_2.checkIfValid)(order_by, query_utils_1.orderByValues)) {
        return Promise.reject({
            status: 400,
            msg: `Invalid order_by query: ${order_by}`,
        });
    }
    let queryStr = ` 
  SELECT reviews.*, COUNT(comment_id) :: INT AS comment_count, 
  COUNT(*) OVER() :: INT AS full_count  
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id 
  `;
    if (category) {
        queryStr += `WHERE reviews.category = $3 `;
        values.push(category);
    }
    queryStr += `
  GROUP BY reviews.review_id
  ORDER BY ${sort_by} ${order_by} 
  LIMIT $1 OFFSET $2;`;
    const result = yield connection_1.default.query(queryStr, values);
    const reviews = result.rows;
    if (!reviews.length)
        return Promise.reject({ status: 404, msg: "Not found!" });
    const totalReviewsObject = {
        reviews,
        currentPage: page,
        pageTotal: Math.ceil(result.rows[0].full_count / limit),
    };
    return totalReviewsObject;
});
exports.fetchAllReviews = fetchAllReviews;
const updateReviewById = (inc_votes, review_id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `
  UPDATE reviews
  SET votes = votes + $1
  WHERE review_id = $2
  RETURNING *;
  `;
    const values = [inc_votes, review_id];
    const result = yield connection_1.default.query(queryStr, values);
    const review = result.rows[0];
    if (!review) {
        return Promise.reject({
            status: 404,
            msg: "Review not found!",
        });
    }
    return review;
});
exports.updateReviewById = updateReviewById;
const sendReview = ({ username, title, review_body, designer, category, }) => __awaiter(void 0, void 0, void 0, function* () {
    if ([username, title, review_body, designer, category].some((el) => !el))
        return Promise.reject({ status: 400, msg: "Please fill in all fields!" });
    let queryStr = `INSERT INTO reviews (owner, title, review_body, designer, category)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    let values = [username, title, review_body, designer, category];
    const insertQuery = yield connection_1.default.query(queryStr, values);
    return insertQuery.rows[0];
});
exports.sendReview = sendReview;
const removeReview = (review_id) => __awaiter(void 0, void 0, void 0, function* () {
    let queryStr = `DELETE FROM reviews * WHERE review_id = $1`;
    const values = [review_id];
    const result = yield connection_1.default.query(queryStr, values);
    return result.rows;
});
exports.removeReview = removeReview;
