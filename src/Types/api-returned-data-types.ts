type ReturnedComment = {
  body: string;
  votes: Number;
  author: string;
  review_id: Number;
  created_at: Date;
};

type ReturnedReview = {
  title: string;
  designer: string;
  owner: string;
  review_img_url: string;
  review_body: string;
  category: string;
  created_at: string;
  votes: Number;
  review_id: Number;
  comment_count: Number;
};

type ReturnedReviewObj = {
  reviews: ReturnedReview[];
  currentPage: Number;
  pageTotal: number;
};

type ReturnedCommentObj = {
  comments: ReturnedComment[];
  currentPage: Number;
  pageTotal: Number;
};

export {
  ReturnedComment,
  ReturnedReview,
  ReturnedReviewObj,
  ReturnedCommentObj,
};
