export type fetchReviewsParams = {
  sort_by?: string;
  order_by?: string;
  category?: string;
  limit?: number;
  page?: number;
};

export type fetchCommentsQuery = {
  sort_by?: string;
  order_by?: string;
  limit?: number;
  page?: number;
};

export type fetchCommentsParams = {
  review_id?: string;
  comment_id?: string;
};

export type CommentsParams = {
  sort_by?: string;
  order_by?: string;
  limit?: number;
  page?: number;
  review_id?: string;
  comment_id?: string;
};
