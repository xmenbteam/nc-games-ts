type RawCategory = {
  slug: string;
  description: string;
};

type RawUser = {
  username: String;
  name: String;
  avatar_url: String;
};

type RawComment = {
  body: String;
  votes: Number;
  author: String;
  review_id: Number;
  created_at: Date;
};

type RawReview = {
  title: String;
  designer: String;
  owner: String;
  review_img_url: String;
  review_body: String;
  category: String;
  created_at: Date;
  votes: Number;
};

type SeedData = {
  categoryData: RawCategory[];
  commentData: RawComment[];
  reviewData: RawReview[];
  userData: RawUser[];
};

export { RawCategory, RawUser, RawComment, RawReview, SeedData };
