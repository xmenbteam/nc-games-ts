"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = exports.reviewData = exports.commentData = exports.categoryData = void 0;
const categories_1 = __importDefault(require("./categories"));
exports.categoryData = categories_1.default;
const comments_1 = __importDefault(require("./comments"));
exports.commentData = comments_1.default;
const reviews_1 = __importDefault(require("./reviews"));
exports.reviewData = reviews_1.default;
const users_1 = __importDefault(require("./users"));
exports.userData = users_1.default;
