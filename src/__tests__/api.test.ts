import { seed } from "../db/seeds/seed";
import * as testData from "../db/data/test-data/index";
import db from "../db/connection";
import request from "supertest";
import app from "../app";

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("api", () => {
  test("returns api", async () => {
    const response = await request(app).get("/api").expect(200);
    expect(response.body.msg).toBe("Api running!");
  });
});

describe("CATEGORIES", () => {
  test.only("returns categories", async () => {
    const response = await request(app).get("/api/categories").expect(200);
    expect(Array.isArray(response.body.categories)).toBe(true);
  });
});
