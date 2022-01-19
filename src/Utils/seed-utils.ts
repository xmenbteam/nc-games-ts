import {
  formattedCategoryData,
  formattedCommentData,
  formattedReviewData,
  formattedUserData,
} from "../Types/formatted-data-types";
import {
  rawCategory,
  rawComment,
  rawReview,
  rawUser,
} from "../Types/raw-data-types";

export const categoryDataFormatter = (
  categoryData: rawCategory[]
): formattedCategoryData[] => {
  return categoryData.map(({ slug, description }) => {
    return [slug, description];
  });
};

export const userDataFormatter = (userData: rawUser[]): formattedUserData[] => {
  return userData.map(({ username, avatar_url, name }) => {
    return [username, avatar_url, name];
  });
};

export const reviewDataFormatter = (
  reviewData: rawReview[]
): formattedReviewData[] => {
  return reviewData.map(
    ({
      title,
      review_body,
      designer,
      review_img_url,
      votes,
      category,
      owner,
      created_at,
    }) => {
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
    }
  );
};

export const commentDataFormatter = (
  commentData: rawComment[]
): formattedCommentData[] => {
  return commentData.map(({ author, review_id, votes, created_at, body }) => {
    return [author, review_id, votes, created_at, body];
  });
};
