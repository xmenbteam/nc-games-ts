"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentDataFormatter = exports.reviewDataFormatter = exports.userDataFormatter = exports.categoryDataFormatter = void 0;
const categoryDataFormatter = (categoryData) => {
    return categoryData.map(({ slug, description }) => {
        return [slug, description];
    });
};
exports.categoryDataFormatter = categoryDataFormatter;
const userDataFormatter = (userData) => {
    return userData.map(({ username, avatar_url, name }) => {
        return [username, avatar_url, name];
    });
};
exports.userDataFormatter = userDataFormatter;
const reviewDataFormatter = (reviewData) => {
    return reviewData.map(({ title, review_body, designer, review_img_url, votes, category, owner, created_at, }) => {
        return [
            title,
            review_body,
            designer,
            review_img_url,
            votes,
            category,
            owner,
            created_at,
        ];
    });
};
exports.reviewDataFormatter = reviewDataFormatter;
const commentDataFormatter = (commentData) => {
    return commentData.map(({ author, review_id, votes, created_at, body }) => {
        return [author, review_id, votes, created_at, body];
    });
};
exports.commentDataFormatter = commentDataFormatter;
