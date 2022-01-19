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
exports.seed = void 0;
const format = require("pg-format");
const connection_1 = __importDefault(require("../../connection"));
const manage_tables_1 = require("../../../Utils/manage-tables");
const seed_utils_1 = require("../../../Utils/seed-utils");
const seed = (categoryData, commentData, reviewData, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, manage_tables_1.dropTables)();
    yield (0, manage_tables_1.createTables)();
    const insertIntoCategories = format(`
  INSERT INTO categories 
      (slug, description)
      VALUES
      %L
      RETURNING *;
  `, (0, seed_utils_1.categoryDataFormatter)(categoryData));
    const categoryQuery = yield connection_1.default.query(insertIntoCategories);
    const categories = categoryQuery.rows;
    const insertIntoUsers = format(`
      INSERT INTO users 
      (username, avatar_url, name)
      VALUES
      %L
      RETURNING *;`, (0, seed_utils_1.userDataFormatter)(userData));
    const users = connection_1.default.query(insertIntoUsers).then((result) => result.rows);
    yield Promise.all([categories, users]);
    const insertIntoReviews = format(`
      INSERT INTO reviews 
      (
        title,
        review_body,
        designer,
        review_img_url,
        votes,
        category,
        owner,
        created_at
        )
      VALUES
      %L
      RETURNING *;`, (0, seed_utils_1.reviewDataFormatter)(reviewData));
    yield connection_1.default.query(insertIntoReviews).then((result) => result.rows);
    const insertIntoComments = format(`
      INSERT INTO comments
      (
        author, 
        review_id,
        votes, 
        created_at, 
        body
        )
        VALUES
      %L
      RETURNING *;`, (0, seed_utils_1.commentDataFormatter)(commentData));
    return connection_1.default.query(insertIntoComments).then((result) => result.rows);
});
exports.seed = seed;
