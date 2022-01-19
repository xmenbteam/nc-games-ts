type rawCategory = {
  slug: string;
  description: string;
};

type rawUser = {
  username: String;
  name: String;
  avatar_url: String;
};

type rawComment = {
  body: String;
  votes: Number;
  author: String;
  review_id: Number;
  created_at: Date;
};

type rawReview = {
  title: String;
  designer: String;
  owner: String;
  review_img_url: String;
  review_body: String;
  category: String;
  created_at: Date;
  votes: Number;
};

export { rawCategory, rawUser, rawComment, rawReview };
