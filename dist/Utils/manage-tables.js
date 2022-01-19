"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropTables = exports.createTables = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const createCategories = connection_1.default.query(`
  CREATE TABLE categories
  (slug VARCHAR(255) PRIMARY KEY NOT NULL,
  description VARCHAR(255)
  )
  `);
    const createUsers = connection_1.default.query(`
  CREATE TABLE users
  (username VARCHAR(255) PRIMARY KEY NOT NULL,
  avatar_url VARCHAR(255),
  name VARCHAR(255) NOT NULL)
  `);
    yield Promise.all([createCategories, createUsers]);
    yield connection_1.default.query(`
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
    yield connection_1.default.query(`
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
});
exports.createTables = createTables;
const dropTables = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.query(`DROP TABLE IF EXISTS comments`);
    yield connection_1.default.query(`DROP TABLE IF EXISTS reviews`);
    yield connection_1.default.query(`DROP TABLE IF EXISTS users`);
    yield connection_1.default.query(`DROP TABLE IF EXISTS categories`);
});
exports.dropTables = dropTables;
