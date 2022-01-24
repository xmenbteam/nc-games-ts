import { seed } from "../db/seeds/seed";
import * as testData from "../db/data/test-data/index";
import db from "../db/connection";
import request from "supertest";
import app from "../app";
import { RawCategory, RawComment, RawUser } from "../Types/raw-data-types";
import { ReturnedReview } from "../Types/api-returned-data-types";

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("API", () => {
  test("returns api", async () => {
    const response = await request(app).get("/api").expect(200);
    expect(response.body.msg).toBe("Api running!");
  });
});

describe("CATEGORIES", () => {
  describe("GET CATEGORIES", () => {
    test("200 - GET categories", async () => {
      const response = await request(app).get("/api/categories").expect(200);

      const categories: RawCategory[] = response.body.categories;

      expect(Array.isArray(categories)).toBe(true);
      categories.forEach((category: RawCategory) => {
        expect(category).toEqual(
          expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String),
          })
        );
      });
    });
  });
  describe("POST CATEGORY", () => {
    test("201 - POST new category", async () => {
      const body = {
        slug: "MMORPG",
        description: "For those who really hate the real world",
      };
      const beforeCats = await request(app).get("/api/categories").expect(200);
      const category = await request(app)
        .post("/api/categories")
        .send(body)
        .expect(201);
      const afterCats = await request(app).get("/api/categories").expect(200);
      expect(beforeCats.body.categories.length).toBe(4);
      expect(category.body.category).toEqual(body);
      expect(afterCats.body.categories.length).toBe(5);
    });
    test("400 - Bad Request - POST new category", async () => {
      const body = {
        // slug: "MMORPG",
        description: "For those who really hate the real world",
      };

      const response = await request(app)
        .post("/api/categories")
        .send(body)
        .expect(400);
      expect(response.body.msg).toBe("Field cannot be null!");
    });
  });
});

describe("REVIEWS", () => {
  describe("GET REVIEW BY ID", () => {
    test("200 - GET Review by ID", async () => {
      const review_id = 3;
      const response = await request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(200);
      const review: ReturnedReview = response.body.review;
      const sampleReview: ReturnedReview = {
        title: "Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "bainesface",
        review_id: 3,
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "We couldn't find the werewolf!",
        category: "social deduction",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 5,
        comment_count: 3,
      };
      expect(review).toEqual(sampleReview);
    });
    test("400 - Bad request - GET Review by ID", async () => {
      const review_id = "cheese";
      const response = await request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(400);
      const msg = response.body.msg;
      expect(msg).toBe("Bad request!");
    });
    test("404 - Review Does Not Exist - GET Review by ID", async () => {
      const review_id = 12345;
      const response = await request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(404);
      const msg = response.body.msg;
      expect(msg).toBe("Review Not Found!");
    });
  });
  describe("GET ALL REVIEWS", () => {
    test("200 - GET all reviews", async () => {
      const response = await request(app).get("/api/reviews").expect(200);

      const reviews: ReturnedReview[] = response.body.reviews;
      expect(reviews.length).toBe(10);
    });
    test("200 - GET reviews Sorted", async () => {
      const response = await request(app).get("/api/reviews").expect(200);

      const reviews = response.body.reviews;
      expect(reviews).toHaveLength(10);
      const newReviews = [...reviews];
      const sortedByDate = newReviews.sort(
        (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
      );
      expect(sortedByDate).toEqual(reviews);
      reviews.forEach((review: ReturnedReview) => {
        expect(review).toEqual(
          expect.objectContaining({
            category: expect.any(String),
            created_at: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_body: expect.any(String),
            review_id: expect.any(Number),
            review_img_url: expect.any(String),
            title: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
    });
    test("200 - GET reviews Sorted ASC by category", async () => {
      const sort = "category";
      const order = "asc";
      const response = await request(app)
        .get(`/api/reviews?sort_by=${sort}&order_by=${order}`)
        .expect(200);
      const reviews = response.body.reviews;
      expect(reviews).toHaveLength(10);
      const newReviews = [...reviews];
      const sortedByDate = newReviews.sort((a, b) => a.category - b.category);
      expect(sortedByDate).toEqual(reviews);
      reviews.forEach((review: ReturnedReview) => {
        expect(review).toEqual(
          expect.objectContaining({
            category: expect.any(String),
            created_at: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_body: expect.any(String),
            review_id: expect.any(Number),
            review_img_url: expect.any(String),
            title: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
    });
    test("200 - GET reviews Sorted DESC by comment_count", async () => {
      const sort = "comment_count";
      const order = "desc";
      const response = await request(app)
        .get(`/api/reviews?sort_by=${sort}&order_by=${order}`)
        .expect(200);
      const reviews = response.body.reviews;
      expect(reviews).toHaveLength(10);
      const newReviews = [...reviews];
      const sortedByDate = newReviews.sort(
        (a, b) => b.comment_count - a.comment_count
      );
      expect(sortedByDate).toEqual(reviews);
      reviews.forEach((review: ReturnedReview) => {
        expect(review).toEqual(
          expect.objectContaining({
            category: expect.any(String),
            created_at: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_body: expect.any(String),
            review_id: expect.any(Number),
            review_img_url: expect.any(String),
            title: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
    });
    test("200 - GET reviews Filtered by category= dexterity", async () => {
      // const sort = "comment_count";
      // const order = "desc";
      const category = "dexterity";
      const response = await request(app)
        .get(`/api/reviews?category=${category}`)
        .expect(200);
      const reviews = response.body.reviews;
      expect(reviews).toHaveLength(1);
      reviews.forEach((review: ReturnedReview) => {
        expect(review).toEqual(
          expect.objectContaining({
            category: expect.any(String),
            created_at: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_body: expect.any(String),
            review_id: expect.any(Number),
            review_img_url: expect.any(String),
            title: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
    });
    test("200 - GET reviews Sorted Desc by comment_count Filtered by category=", async () => {
      const sort = "comment_count";
      const order = "desc";
      const category = "social deduction";
      const response = await request(app)
        .get(
          `/api/reviews?sort_by=${sort}&order_by=${order}&category=${category}`
        )
        .expect(200);
      const reviews = response.body.reviews;
      expect(reviews).toHaveLength(10);
      const newReviews = [...reviews];
      const sortedByDate = newReviews.sort(
        (a, b) => b.comment_count - a.comment_count
      );
      expect(sortedByDate).toEqual(reviews);
      reviews.forEach((review: ReturnedReview) => {
        expect(review).toEqual(
          expect.objectContaining({
            category: expect.any(String),
            created_at: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_body: expect.any(String),
            review_id: expect.any(Number),
            review_img_url: expect.any(String),
            title: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
    });
  });
  describe("PATCH REVIEW BY ID", () => {
    test("201 - Increases votes review by ID", async () => {
      const inc_votes = 1;
      const review_id = "3";
      const originalReview = await request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(200);
      const updatedReview = await request(app)
        .patch(`/api/reviews/${review_id}`)
        .send({ inc_votes })
        .expect(201);
      const originalVotes = originalReview.body.review.votes;
      const updatedVotes = updatedReview.body.review.votes;

      expect(originalVotes).not.toBe(updatedVotes);
      expect(updatedVotes).toBe(6);
    });
    test("201 - Decreases votes review by ID", async () => {
      const inc_votes = -1;
      const review_id = "3";
      const originalReview = await request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(200);
      const updatedReview = await request(app)
        .patch(`/api/reviews/${review_id}`)
        .send({ inc_votes })
        .expect(201);
      const originalVotes = originalReview.body.review.votes;
      const updatedVotes = updatedReview.body.review.votes;

      expect(originalVotes).not.toBe(updatedVotes);
      expect(updatedVotes).toBe(4);
    });
    test("400 - Bad request - string inc-votes", async () => {
      const inc_votes = "cheese";
      const review_id = "3";

      const updatedReview = await request(app)
        .patch(`/api/reviews/${review_id}`)
        .send({ inc_votes })
        .expect(400);

      expect(updatedReview.body.msg).toBe("Bad request!");
    });
    test("400 - Bad request - string review_id", async () => {
      const inc_votes = 1;
      const review_id = "cheese";

      const updatedReview = await request(app)
        .patch(`/api/reviews/${review_id}`)
        .send({ inc_votes })
        .expect(400);

      expect(updatedReview.body.msg).toBe("Bad request!");
    });
    test("404 - Review not found", async () => {
      const inc_votes = 1;
      const review_id = "12345";

      const updatedReview = await request(app)
        .patch(`/api/reviews/${review_id}`)
        .send({ inc_votes })
        .expect(404);

      expect(updatedReview.body.msg).toBe("Review not found!");
    });
  });
  describe("REVIEW PAGINATION", () => {
    test("limit = 11 p = 1", async () => {
      const limit = 11;
      const p = 1;
      const response = await request(app)
        .get(`/api/reviews?limit=${limit}&page=${p}`)
        .expect(200);
      expect(response.body.reviews.length).toBe(11);
    });
    test("limit = 10 p = 2", async () => {
      const limit = 10;
      const p = 2;
      const response = await request(app)
        .get(`/api/reviews?limit=${limit}&page=${p}`)
        .expect(200);
      expect(response.body.pages).toBe(2);
      expect(response.body.reviews.length).toBe(3);
    });
    test("limit = 2 p = 1", async () => {
      const limit = 2;
      const p = 1;
      const response = await request(app)
        .get(`/api/reviews?limit=${limit}&page=${p}`)
        .expect(200);
      expect(response.body.pages).toBe(7);
      expect(response.body.reviews.length).toBe(2);
    });
  });
  describe("POST REVIEW", () => {
    test("201 - POST new review", async () => {
      const body = {
        username: "bainesface",
        title: "OMG I LOVE TWISTER",
        review_body: "Just great. Twisty fun an that",
        designer: "hasbro",
        category: "dexterity",
      };
      const response = await request(app)
        .post("/api/reviews")
        .send(body)
        .expect(201);

      expect(response.body.review).toEqual(
        expect.objectContaining({
          review_id: 14,
          title: "OMG I LOVE TWISTER",
          review_body: "Just great. Twisty fun an that",
          designer: "hasbro",
          review_img_url:
            "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
          votes: 0,
          category: "dexterity",
          owner: "bainesface",
          created_at: expect.any(String),
          // comment_count: 0,
        })
      );
    });
    test("400 - POST new review - username doesnt exist", async () => {
      const body = {
        username: "cheeseman",
        title: "OMG I LOVE TWISTER",
        review_body: "Just great. Twisty fun an that",
        designer: "hasbro",
        category: "dexterity",
      };
      const response = await request(app)
        .post("/api/reviews")
        .send(body)
        .expect(404);
      expect(response.body.msg).toBe("Not found!");
    });
    test("400 - POST new review - incomplete", async () => {
      const body = {
        username: "bainesface",
        title: "OMG I LOVE TWISTER",
        review_body: "Just great. Twisty fun an that",
        category: "dexterity",
      };
      const response = await request(app)
        .post("/api/reviews")
        .send(body)
        .expect(400);
      expect(response.body.msg).toBe("Please fill in all fields!");
    });
  });
  describe("DELETE REVIEW", () => {
    test("204 - Delete Review", async () => {
      const review_id = 3;
      return request(app)
        .delete(`/api/reviews/${review_id}`)
        .expect(204)
        .then(async () => {
          const review = await request(app)
            .get(`/api/reviews/${review_id}`)
            .expect(404);
          expect(review.body.msg).toBe("Review Not Found!");
          // const comments = await request(app)
          //   .get(`/api/reviews/${review_id}/comments`)
          //   .expect(404);
          // expect(comments.body.msg).toBe("Oh dear, comments not found!");
        });
    });
  });
});

describe("USERS", () => {
  describe("GET", () => {
    test("200 GET users", async () => {
      const response = await request(app).get("/api/users").expect(200);
      const users = response.body.users;
      expect(users).toHaveLength(4);
      users.forEach((user: RawUser) => {
        expect(user).toEqual(
          expect.objectContaining({
            username: expect.any(String),
          })
        );
      });
    });
    test("200 GET user by username", async () => {
      const response = await request(app)
        .get("/api/users/bainesface")
        .expect(200);
      const user = response.body.users[0];
      expect(user).toEqual({
        username: "bainesface",
        name: "sarah",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      });
    });
    test("404 GET user not found - user by username", async () => {
      const response = await request(app)
        .get("/api/users/superman")
        .expect(404);
      const message = response.body.msg;
      expect(message).toBe("User not found!");
    });
  });
  describe("POST", () => {
    test("201 - POST new user", async () => {
      const newUser = {
        username: "sample",
        name: "sam",
        avatar_url: "http://www.google.com",
      };
      const response = await request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201);
      const user = response.body.user;
      expect(user).toEqual(newUser);
    });
    test("400 - Missing Data - POST new user", async () => {
      const newUser = {
        username: "sample",
        // name: "sam",
        avatar_url: "http://www.google.com",
      };
      const response = await request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400);
      const msg = response.body.msg;
      expect(msg).toBe("Field cannot be null!");
    });
  });
});

describe("COMMENTS", () => {
  describe("GET COMMENTS BY REVIEW ID", () => {
    test("200 - GET comments", async () => {
      const response = await request(app).get("/api/comments").expect(200);
      const comments = response.body.comments;
      expect(comments).toHaveLength(6);
      comments.forEach((comment: RawComment) => {
        expect(comment).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            review_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            comment_id: expect.any(Number),
            body: expect.any(String),
          })
        );
      });
    });
    test("200 - GET comments by review id", async () => {
      const response = await request(app)
        .get("/api/reviews/2/comments")
        .expect(200);
      const comments = response.body.comments;
      expect(Array.isArray(comments)).toBe(true);
      expect(comments.length).toBe(3);
    });
    test("400 - Bad Request", async () => {
      const response = await request(app)
        .get("/api/reviews/cheese/comments")
        .expect(400);
      expect(response.body.msg).toBe("Bad request!");
    });
    test("404 - Comment not found", async () => {
      const response = await request(app)
        .get("/api/reviews/12345/comments")
        .expect(404);
      expect(response.body.msg).toBe("Comments not found!");
    });
  });
  describe("filter/sort", () => {
    test("200 - GET comments by review_id sorted by votes desc", async () => {
      const sort_by = "votes";
      const review_id = 2;
      const order_by = "desc";
      const response = await request(app)
        .get(
          `/api/reviews/${review_id}/comments?sort_by=${sort_by}&order_by=${order_by}`
        )
        .expect(200);
      const comments = response.body.comments;
      const sortedComments = comments.sort(
        (a: { votes: number }, b: { votes: number }) => b.votes - a.votes
      );
      expect(comments).toEqual(sortedComments);
    });
    test("400 - Invalid sort_by", async () => {
      const response = await request(app)
        .get("/api/reviews/1/comments?sort_by=cheese")
        .expect(400);
      expect(response.body.msg).toBe("invalid sort by column");
    });
    test("400 - Invalid order_by", async () => {
      const response = await request(app)
        .get("/api/reviews/1/comments?order_by=cheese")
        .expect(400);
      expect(response.body.msg).toBe("invalid order by column");
    });
  });
  describe("POST", () => {
    test("201 - POST new comment", async () => {
      const body = {
        body: "Reyt good, well done",
        username: "mallionaire",
      };
      const review_id = 2;
      const response = await request(app)
        .post(`/api/reviews/${review_id}/comments`)
        .send(body)
        .expect(201);
      const res = response.body.comment;
      expect(res).toEqual(
        expect.objectContaining({
          comment_id: 7,
          author: "mallionaire",
          review_id: 2,
          votes: 0,
          created_at: expect.any(String),
          body: "Reyt good, well done",
        })
      );
    });
    test("400 - bad request - POST new comment", async () => {
      const body = {
        body: "Reyt good, well done",
        username: "mallionaire",
      };
      const review_id = "cheese";
      const response = await request(app)
        .post(`/api/reviews/${review_id}/comments`)
        .send(body)
        .expect(400);
      expect(response.body.msg).toBe("Bad request!");
    });
    test("404 - review not found - POST new comment", async () => {
      const body = {
        body: "Reyt good, well done",
        username: "mallionaire",
      };
      const review_id = 123415;
      const response = await request(app)
        .post(`/api/reviews/${review_id}/comments`)
        .send(body)
        .expect(404);
      expect(response.body.msg).toBe("Not found!");
    });
  });
  describe("PATCH", () => {
    test("200 - PATCH Votes - positive int", async () => {
      const comment_id = "3";
      const newVote = { inc_votes: 1 };

      const getComment = await request(app)
        .get(`/api/comments/${comment_id}`)
        .expect(200);

      const patchedComment = await request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(newVote)
        .expect(200);

      const getVotes = getComment.body.comments[0].votes;
      const patchedVotes = patchedComment.body.comment.votes;
      expect(getVotes).toBe(10);
      expect(patchedVotes).toBe(11);
      expect(getVotes).not.toBe(patchedVotes);
    });
    test("201 - PATCH Votes - negative int", async () => {
      const comment_id = 3;
      const newVote = { inc_votes: -1 };

      const getComment = request(app)
        .get(`/api/comments/${comment_id}`)
        .expect(200);

      const patchedComment = request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(newVote)
        .expect(200);

      const [getComment_1, patchedComment_1] = await Promise.all([
        getComment,
        patchedComment,
      ]);
      const getVotes = getComment_1.body.comments[0].votes;
      const patchedVotes = patchedComment_1.body.comment.votes;
      expect(getVotes).toBe(10);
      expect(patchedVotes).toBe(9);
      expect(getVotes).not.toBe(patchedVotes);
    });
    test("400 - bad request - PATCH votes", async () => {
      const comment_id = 3;
      const newVote = { inc_votes: "cheese" };
      const response = await request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(newVote)
        .expect(400);
      expect(response.body.msg).toBe("Bad request!");
    });
    test("404 - comment not found - PATCH votes", async () => {
      const comment_id = 333333333333;
      const newVote = { inc_votes: 1 };
      const response = await request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(newVote)
        .expect(404);
      expect(response.body.msg).toBe("Comment not found!");
    });
  });
  describe("DELETE", () => {
    test("204 - delete comment", async () => {
      const comment_id = 3;
      await request(app).delete(`/api/comments/${comment_id}`).expect(204);

      const response = await request(app)
        .delete(`/api/comments/${comment_id}`)
        .expect(404);

      const message = response.body.msg;
      expect(message).toBe("Comment not found!");
    });
    test("404 - delete comment - comment not found", async () => {
      const comment_id = 3789456212;
      const response = await request(app)
        .delete(`/api/comments/${comment_id}`)
        .expect(404);
      const message = response.body.msg;
      expect(message).toBe("Comment not found!");
    });
    test("400 - delete comment - bad request", async () => {
      const comment_id = "cheese";
      const response = await request(app)
        .delete(`/api/comments/${comment_id}`)
        .expect(400);
      const message = response.body.msg;
      expect(message).toBe("Bad request!");
    });
  });
  describe("PAGINATION", () => {
    test("Review 3, limit = 10 p = 1", async () => {
      const review_id = 3;
      const limit = 10;
      const p = 1;
      const response = await request(app)
        .get(`/api/reviews/${review_id}/comments?limit=${limit}&page=${p}`)
        .expect(200);
      expect(response.body.comments.length).toBe(3);
    });
    test("Review 3, limit = 1 p = 1", async () => {
      const review_id = 3;
      const limit = 1;
      const p = 1;
      const response = await request(app)
        .get(`/api/reviews/${review_id}/comments?limit=${limit}&page=${p}`)
        .expect(200);
      expect(response.body.comments.length).toBe(1);
      expect(response.body.pages).toBe(3);
    });
  });
});
