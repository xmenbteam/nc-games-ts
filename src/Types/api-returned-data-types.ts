type ReturnedComment = {
  body: String;
  votes: Number;
  author: String;
  review_id: Number;
  created_at: Date;
};

type ReturnedReview = {
  title: String;
  designer: String;
  owner: String;
  review_img_url: String;
  review_body: String;
  category: String;
  created_at: String;
  votes: Number;
  review_id: Number;
  comment_count: Number;
};

type ReturnedReviewObj = {
  reviews: ReturnedReview[];
  pageTotal: number;
};

export { ReturnedComment, ReturnedReview, ReturnedReviewObj };
