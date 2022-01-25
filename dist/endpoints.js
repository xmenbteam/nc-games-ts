"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endPoints = void 0;
exports.endPoints = {
    API: {
        "GET /api": {
            description: "All available endpoints",
        },
    },
    CATEGORIES: {
        "GET /api/categories": {
            description: "serves an array of all topics",
            queries: [],
            exampleResponse: {
                topics: [
                    { slug: "dexterity", description: "Games involving physical skill" },
                ],
            },
        },
        "POST /api/categories": {
            description: "accepts a body of slug and description, returns the body back",
            exampleRequestBody: {
                slug: "MMORPG",
                description: "For those who really hate the real world",
            },
            exampleResponse: {
                category: {
                    slug: "MMORPG",
                    description: "For those who really hate the real world",
                },
            },
        },
    },
    USERS: {
        "GET /api/users": {
            description: "serves an array of all users' usernames",
            queries: [],
            exampleResponse: {
                users: [
                    { username: "butter_bridge" },
                    { username: "icellusedkars" },
                    { username: "rogersop" },
                    { username: "lurker" },
                ],
            },
        },
        "GET /api/users/:username": {
            description: "serves an object of a user with the given username",
            queries: [],
            exampleRequest: "/api/users/coder123",
            exampleResponse: {
                username: "coder123",
                name: "Cody",
                avatar_url: "https://avatar.url",
            },
        },
        "POST /api/users/:username": {
            description: "accepts a body of username, name, and avatar_url and responds with the object in response",
            exampleRequest: {
                username: "sample",
                name: "sam",
                avatar_url: "http://www.google.com",
            },
            exampleResponse: {
                username: "sample",
                name: "sam",
                avatar_url: "http://www.google.com",
            },
        },
    },
    REVIEWS: {
        "GET /api/reviews": {
            description: "serves an object containing and array of all reviews, paginated automatically to a limit of 10, the total count of the reviews, and the number of pages.",
            queries: [
                "review_id",
                "comment_id",
                "category",
                "sort_by",
                "order_by",
                "limit",
                "page",
            ],
            sort_by: [
                "created_at",
                "category",
                "owner",
                "title",
                "review_id",
                "votes",
                "comment_count",
            ],
            order_by: ["asc", "desc"],
            exampleResponse: {
                reviews: [
                    {
                        review_id: 7,
                        title: "Mollit elit qui incididunt veniam occaecat cupidatat",
                        review_body: "Consectetur incididunt aliquip sunt officia. Magna ex nulla consectetur laboris incididunt ea non qui. Enim id eiusmod irure dolor ipsum in tempor consequat amet ullamco. Occaecat fugiat sint fugiat mollit consequat pariatur consequat non exercitation dolore. Labore occaecat in magna commodo anim enim eiusmod eu pariatur ad duis magna. Voluptate ad et dolore ullamco anim sunt do. Qui exercitation tempor in in minim ullamco fugiat ipsum. Duis irure voluptate cupidatat do id mollit veniam culpa. Velit deserunt exercitation amet laborum nostrud dolore in occaecat minim amet nostrud sunt in. Veniam ut aliqua incididunt commodo sint in anim duis id commodo voluptate sit quis.",
                        designer: "Avery Wunzboogerz",
                        review_img_url: "https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                        votes: 9,
                        category: "social deduction",
                        owner: "mallionaire",
                        created_at: "2021-01-25T11:16:54.963Z",
                        comment_count: 0,
                        full_count: 13,
                    },
                ],
                pages: 3,
            },
        },
        "GET /api/reviews/:review_id": {
            description: "serves an object of an article with the given ID",
            queries: [],
            exampleRequest: "/api/reviews/1",
            exampleResponse: {
                article: {
                    title: "Ultimate Werewolf",
                    designer: "Akihisa Okui",
                    owner: "bainesface",
                    review_id: 3,
                    review_img_url: "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                    review_body: "We couldn't find the werewolf!",
                    category: "social deduction",
                    created_at: "2021-01-18T10:01:41.251Z",
                    votes: 5,
                    comment_count: 3,
                },
            },
        },
        "PATCH /api/reviews/:review_id": {
            description: "accepts an object in the form {inc_votes : newVotes} where newVotes is an integer and returns the updated review.",
            queries: [],
            exampleRequest: "/api/reviews/1",
            exampleRequestBody: {
                inc_votes: 2,
            },
            exampleResponse: {
                review: {
                    title: "Ultimate Werewolf",
                    designer: "Akihisa Okui",
                    owner: "bainesface",
                    review_id: 3,
                    review_img_url: "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                    review_body: "We couldn't find the werewolf!",
                    category: "social deduction",
                    created_at: "2021-01-18T10:01:41.251Z",
                    votes: 5,
                    comment_count: 3,
                },
            },
        },
        "POST /api/reviews": {
            description: "POSTS a new review",
            exampleRequest: {
                username: "bainesface",
                title: "OMG I LOVE TWISTER",
                review_body: "Just great. Twisty fun an that",
                designer: "hasbro",
                category: "dexterity",
            },
            exampleResponse: {
                review_id: 14,
                title: "OMG I LOVE TWISTER",
                review_body: "Just great. Twisty fun an that",
                designer: "hasbro",
                review_img_url: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
                votes: 0,
                category: "dexterity",
                owner: "bainesface",
                created_at: "TIMESTAMP",
            },
        },
        "DELETE /api/reviews/:review_id": {
            description: "Deletes review by review_id, responds with no content",
            exampleRequest: "/api/reviews/3",
        },
    },
    COMMENTS: {
        "GET /api/reviews/:review_id/comments": {
            description: "serves an object containing all comments associated with the given review ID automatically paginated to 10, and a total page count",
            queries: [
                "review_id",
                "comment_id",
                "sort_by",
                "order_by",
                "limit",
                "page",
            ],
            acceptedSortBy: [
                "created_at",
                "category",
                "owner",
                "title",
                "review_id",
                "votes",
                "comment_count",
            ],
            acceptedOrderBy: ["asc", "desc"],
            exampleRequest: "/api/reviews/5/comments",
            exampleResponse: {
                comments: [
                    {
                        comment_id: 5,
                        author: "mallionaire",
                        review_id: 2,
                        votes: 13,
                        created_at: "2021-01-18T10:24:05.410Z",
                        body: "Now this is a story all about how, board games turned my life upside down",
                        full_count: 3,
                    },
                    {
                        comment_id: 1,
                        author: "bainesface",
                        review_id: 2,
                        votes: 16,
                        created_at: "2017-11-22T12:43:33.389Z",
                        body: "I loved this game too!",
                        full_count: 3,
                    },
                    {
                        comment_id: 4,
                        author: "bainesface",
                        review_id: 2,
                        votes: 16,
                        created_at: "2017-11-22T12:36:03.389Z",
                        body: "EPIC board game!",
                        full_count: 3,
                    },
                ],
                pages: 1,
            },
        },
        "POST /api/reviews/:review_id/comments": {
            description: "accepts an object with username and body properties, posts a comment and associates it with the given review_id, then responds with the posted comment",
            queries: ["sort_by", "order_by", "limit", "page"],
            exampleRequest: "/api/reviews/3/comments",
            exampleRequestBody: {
                body: "Reyt good, well done",
                username: "mallionaire",
            },
            exampleResponse: {
                comment: {
                    comment_id: 7,
                    author: "mallionaire",
                    review_id: 2,
                    votes: 0,
                    created_at: "2020-09-03T02:06:00.000Z",
                    body: "Reyt good, well done",
                },
            },
        },
        "PATCH /api/comments/:comment_id": {
            description: "accepts an object in the form {inc_votes : newVotes} where newVotes is an integer and returns the updated review.",
            queries: [],
            exampleRequest: "/api/reviews/1",
            exampleRequestBody: {
                inc_votes: 2,
            },
            exampleResponse: {
                comment: {
                    comment_id: 3,
                    author: "philippaclaire9",
                    review_id: 3,
                    votes: 11,
                    created_at: "2021-01-18T10:09:48.110Z",
                    body: "I didn't know dogs could play games",
                },
            },
        },
        "DELETE /api/comments/:comment_id": {
            description: "Deletes comment with the given comment ID and responds with no content",
            queries: [],
            exampleRequest: "/api/comments/2",
            exampleResponse: {},
        },
    },
};
