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
exports.removeComment = exports.updateComment = exports.sendComment = exports.fetchComments = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const util_functions_1 = require("../Utils/util-functions");
const query_utils_1 = require("../Utils/query-utils");
const fetchComments = ({ review_id, comment_id, sort_by = "created_at", order_by = "desc", limit = 10, page = 1, }) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (0, util_functions_1.pageOffsetCalc)(page, limit);
    const values = [limit, offset];
    const isValidSortBy = (0, util_functions_1.checkIfValid)(sort_by, query_utils_1.sortByValues);
    const isValidOrderBy = (0, util_functions_1.checkIfValid)(order_by, query_utils_1.orderByValues);
    if (!isValidSortBy)
        return Promise.reject({
            status: 400,
            msg: `Invalid sort by column: ${sort_by}`,
        });
    if (!isValidOrderBy)
        return Promise.reject({
            status: 400,
            msg: `Invalid order by column: ${order_by}`,
        });
    let queryStr = `SELECT *, COUNT(*) OVER() :: INT AS full_count 
  FROM comments `;
    if (review_id) {
        queryStr += `WHERE review_id = $3 `;
        values.push(review_id);
    }
    if (comment_id) {
        queryStr += `WHERE comment_id = $3 `;
        values.push(comment_id);
    }
    queryStr += `ORDER BY ${sort_by} ${order_by}
  LIMIT $1 OFFSET $2;`;
    const comments = yield connection_1.default.query(queryStr, values);
    if (!comments.rows.length)
        return Promise.reject({
            status: 404,
            msg: "Comments not found!",
        });
    const returnedObj = {
        comments: comments.rows,
        currentPage: page,
        pageTotal: Math.ceil(comments.rows[0].full_count / limit),
    };
    return returnedObj;
});
exports.fetchComments = fetchComments;
const sendComment = (review_id, username, body) => __awaiter(void 0, void 0, void 0, function* () {
    let queryStr = `INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *;`;
    const values = [review_id, username, body];
    const result = yield connection_1.default.query(queryStr, values);
    return result.rows[0];
});
exports.sendComment = sendComment;
const updateComment = (inc_votes, comment_id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `
  UPDATE comments
  SET votes = votes + $1
  WHERE comment_id = $2
  RETURNING *;
  `;
    const values = [inc_votes, comment_id];
    const result = yield connection_1.default.query(queryStr, values);
    return result.rows[0];
});
exports.updateComment = updateComment;
const removeComment = (comment_id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `
  DELETE FROM comments WHERE comment_id = $1`;
    const values = [comment_id];
    const result = yield connection_1.default.query(queryStr, values);
    // rowCount === number of deleted rows
    const { rowCount } = result;
    if (!rowCount)
        return Promise.reject({ status: 404, msg: "Comment not found!" });
    return result;
});
exports.removeComment = removeComment;
