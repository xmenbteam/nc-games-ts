Work through building endpoints in the following order:

_This is a summary of all the endpoints. More detail about each endpoint is further down this document._

**Essential endpoints**

```http
GET /api/categories
GET /api/reviews/:review_id
PATCH /api/reviews/:review_id
GET /api/reviews
GET /api/reviews/:review_id/comments
POST /api/reviews/:review_id/comments
DELETE /api/comments/:comment_id
GET /api
```

> Hosting and README time!

**Next endpoints to work through**

```http
GET /api/users
GET /api/users/:username
PATCH /api/comments/:comment_id
```

---

All of your endpoints should send the responses specified below in an **object**, with a **key name** of what it is that being sent. E.g.

```json
{
  "categories": [
    {
      "description": "Abstact games that involve little luck",
      "slug": "Euro games"
    },
    {
      "description": "Players attempt to uncover each other's hidden role",
      "slug": "Social deduction"
    },
    {
      "description": "Games involving physical skill",
      "slug": "Dexterity"
    }
  ]
}
```

---

### Essential Routes

#### **GET /api/categories**

Responds with:

- an array of category objects, each of which should have the following properties:
  - `slug`
  - `description`

---

#### **GET /api/reviews/:review_id**

Responds with:

- a review object, which should have the following properties:

  - `owner` which is the `username` from the users table
  - `title`
  - `review_id`
  - `review_body`
  - `designer`
  - `review_img_url`
  - `category`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this review_id - you should make use of queries to the database in order to achieve this

---

#### **PATCH /api/reviews/:review_id**

Request body accepts:

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current review's vote property by 1

  `{ inc_votes : -100 }` would decrement the current review's vote property by 100

Responds with:

- the updated review

---

#### **GET /api/reviews**

Responds with:

- an `reviews` array of review objects, each of which should have the following properties:
  - `owner` which is the `username` from the users table
  - `title`
  - `review_id`
  - `category`
  - `review_img_url`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this review_id - you should make use of queries to the database in order to achieve this

Should accept queries:

- `sort_by`, which sorts the reviews by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `category`, which filters the reviews by the category value specified in the query

---

#### **GET /api/reviews/:review_id/comments**

Responds with:

- an array of comments for the given `review_id` of which each comment should have the following properties:
  - `comment_id`
  - `votes`
  - `created_at`
  - `author` which is the `username` from the users table
  - `body`

---

#### **POST /api/reviews/:review_id/comments**

Request body accepts:

- an object with the following properties:
  - `username`
  - `body`

Responds with:

- the posted comment

---

#### **DELETE /api/comments/:comment_id**

Should:

- delete the given comment by `comment_id`

Responds with:

- status 204 and no content

---

#### **GET /api**

Responds with:

- JSON describing all the available endpoints on your API

---

### **STOP POINT: Hosting and README!**

- If you _have_ already hosted your app at this point, remember to push up to `heroku` your updated code
- If you haven't already hosted your app, now is the time! Follow the instructions in [hosting.md](./hosting.md)
- Write your README, including the following information:
  - [ ] Link to hosted version
  - [ ] Write a summary of what the project is
  - [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
  - [ ] Include information about how to create the two `.env` files
  - [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

**Remember that this README is targetted at people who will come to your repo (potentially from your CV or portfolio website) and want to see what you have created, and try it out for themselves(not _just_ to look at your code!). So it is really important to include a link to the hosted version, as well as implement the above `GET /api` endpoint so that it is clear what your api does.**

---

### Further Routes

#### **GET /api/users**

Responds with:

- an array of objects, each object should have the following property:
  - `username`

---

#### **GET /api/users/:username**

Responds with:

- a user object which should have the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

#### **PATCH /api/comments/:comment_id**

Request body accepts:

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current comment's vote property by 1

  `{ inc_votes : -1 }` would decrement the current comment's vote property by 1

Responds with:

- the updated comment

---

### _Even more_ endpoints/tasks

#### Adding pagination to GET /api/reviews

> To make sure that an API can handle large amounts of data, it is often necessary to use **pagination**. Head over to [Google](https://www.google.co.uk/search?q=cute+puppies), and you will notice that the search results are broken down into pages. It would not be feasible to serve up _all_ the results of a search in one go. The same is true of websites / apps like Facebook or Twitter (except they hide this by making requests for the next page in the background, when we scroll to the bottom of the browser). We can implement this functionality on our `/api/reviews` and `/api/comments` endpoints.

- Should accepts the following queries:
  - `limit`, which limits the number of responses (defaults to 10)
  - `p`, stands for page which specifies the page at which to start (calculated using limit)
- add a `total_count` property, displaying the total number of reviews (**this should display the total number of reviews with any filters applied, discounting the limit**)

---

#### Adding pagination to GET /api/reviews/:review_id/comments

Should accept the following queries:

- `limit`, which limits the number of responses (defaults to 10)
- `p`, stands for page which specifies the page at which to start (calculated using limit)

---

#### POST /api/reviews

Request body accepts:

- an object with the following properties:

  - `owner` which is the `username` from the users table
  - `title`
  - `review_body`
  - `designer`
  - `category` which is a `category` from the categories table

Responds with:

- the newly added review, with all the above properties as well as:
  - `review_id`
  - `votes`
  - `created_at`
  - `comment_count`

#### POST /api/categories

Request body accepts:

- an object in the form:

```json
{
  "slug": "category name here",
  "description": "description here"
}
```

Responds with:

- a category object containing the newly added category

#### DELETE /api/reviews/:review_id

Should:

- delete the given review by review_id

Respond with:

- status 204 and no content
