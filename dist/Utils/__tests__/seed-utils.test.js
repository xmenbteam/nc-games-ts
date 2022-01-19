"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seed_utils_1 = require("../seed-utils");
describe("categoryDataFormatter", () => {
    test("returns expected", () => {
        const input = [{ slug: "Test", description: "Test" }];
        const expected = [["Test", "Test"]];
        const actual = (0, seed_utils_1.categoryDataFormatter)(input);
        expect(Array.isArray(actual)).toBe(true);
        expect(actual).toEqual(expected);
    });
});
describe("userDataFormatter", () => {
    test("returns expected", () => {
        const input = [{ username: "Test", avatar_url: "Test", name: "Test" }];
        const expected = [["Test", "Test", "Test"]];
        const actual = (0, seed_utils_1.userDataFormatter)(input);
        expect(Array.isArray(actual)).toBe(true);
        expect(actual).toEqual(expected);
    });
});
describe("reviewyDataFormatter", () => {
    test("returns expected", () => {
        const input = [
            {
                title: "Test",
                review_body: "Test",
                designer: "Test",
                review_img_url: "Test",
                votes: 1,
                category: "Test",
                owner: "Test",
                created_at: new Date(1234556778),
            },
        ];
        const expected = [
            ["Test", "Test", "Test", "Test", 1, "Test", "Test", new Date(1234556778)],
        ];
        const actual = (0, seed_utils_1.reviewDataFormatter)(input);
        expect(Array.isArray(actual)).toBe(true);
        expect(actual).toEqual(expected);
    });
});
describe("reviewDataFormatter", () => {
    test("returns expected", () => {
        const input = [
            {
                author: "Test",
                review_id: 1,
                votes: 1,
                created_at: new Date(1234556778),
                body: "Test",
            },
        ];
        const expected = [["Test", 1, 1, new Date(1234556778), "Test"]];
        const actual = (0, seed_utils_1.commentDataFormatter)(input);
        expect(Array.isArray(actual)).toBe(true);
        expect(actual).toEqual(expected);
    });
});
