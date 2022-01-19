import db from "../db/connection";

const createTables = async () => {
  const createCategories = db.query(`
  CREATE TABLE categories
  (slug VARCHAR(255) PRIMARY KEY NOT NULL,
  description VARCHAR(255)
  )
  `);
  const createUsers = db.query(`
  CREATE TABLE users
  (username VARCHAR(255) PRIMARY KEY NOT NULL,
  avatar_url VARCHAR(255),
  name VARCHAR(255) NOT NULL)
  `);

  await Promise.all([createCategories, createUsers]);

  await db.query(`
   CREATE TABLE reviews
        (
        review_id SERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(255) NOT NULL,
        review_body VARCHAR NOT NULL,
        designer VARCHAR(255),
        review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category VARCHAR(255) NOT NULL,
        FOREIGN KEY (category) REFERENCES categories(slug) ON DELETE CASCADE,
        owner VARCHAR(255) NOT NULL,
        FOREIGN KEY (owner) REFERENCES users(username) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
        )
    `);
  await db.query(`
          CREATE TABLE comments
      (
      comment_id SERIAL PRIMARY KEY NOT NULL,
      author VARCHAR(255) NOT NULL,
      FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE,
      review_id INT NOT NULL,
      FOREIGN KEY (review_id) REFERENCES reviews(review_id) ON DELETE CASCADE,
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      body VARCHAR NOT NULL
      )
    `);
};

const dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS comments`);
  await db.query(`DROP TABLE IF EXISTS reviews`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS categories`);
};
export { createTables, dropTables };
