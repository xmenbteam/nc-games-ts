type RawCategory = {
  slug: string;
  description: string;
};

type RawUser = {
  username: string;
  name: string;
  avatar_url: string;
};

type RawComment = {
  body: string;
  votes: number;
  author: string;
  review_id: number;
  created_at: Date;
};

type RawReview = {
  title: string;
  designer: string;
  owner: string;
  review_img_url: string;
  review_body: string;
  category: string;
  created_at: Date;
  votes: number;
};

type SeedData = {
  categoryData: RawCategory[];
  commentData: RawComment[];
  reviewData: RawReview[];
  userData: RawUser[];
};

export { RawCategory, RawUser, RawComment, RawReview, SeedData };
