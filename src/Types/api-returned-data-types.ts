interface Post {
  votes: Number;
  review_id: Number;
  created_at: Date;
}

interface ReturnedComment extends Post {
  body: string;
  author: string;
}

interface ReturnedReview extends Post {
  title: string;
  designer: string;
  owner: string;
  review_img_url: string;
  review_body: string;
  category: string;
  comment_count: Number;
}

interface ReturnedObj {
  currentPage: Number;
  pageTotal: number;
}

interface ReturnedReviewObj extends ReturnedObj {
  reviews: ReturnedReview[];
}

interface ReturnedCommentObj extends ReturnedObj {
  comments: ReturnedComment[];
}

export {
  ReturnedComment,
  ReturnedReview,
  ReturnedReviewObj,
  ReturnedCommentObj,
};
