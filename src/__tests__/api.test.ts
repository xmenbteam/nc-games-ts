import { seed } from "../db/seeds/seed";
import * as testData from "../db/data/test-data/index";
import db from "../db/connection";
import request from "supertest";
import app from "../app";
import { RawCategory, RawUser } from "../Types/raw-data-types";
import { ReturnedReview } from "../Types/api-returned-data-types";

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("api", () => {
  test("returns api", async () => {
    const response = await request(app).get("/api").expect(200);
    expect(response.body.msg).toBe("Api running!");
  });
});

describe("CATEGORIES", () => {
  test("returns categories", async () => {
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
  describe("PAGINATION", () => {
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
      expect(message).toBe("Oh dear! User not found!");
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
