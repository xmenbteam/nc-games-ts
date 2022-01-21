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
exports.sendUser = exports.fetchUsers = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const fetchUsers = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const values = [];
    let queryStr = `SELECT `;
    if (username) {
        queryStr += `username, avatar_url, name `;
    }
    else {
        queryStr += `username `;
    }
    queryStr += `FROM users `;
    if (username) {
        queryStr += `WHERE username = $1;`;
        values.push(username);
    }
    else
        queryStr += `;`;
    const result = yield connection_1.default.query(queryStr, values);
    if (result.rows.length === 0)
        return Promise.reject({ status: 404, msg: "Oh dear! User not found!" });
    return result.rows;
});
exports.fetchUsers = fetchUsers;
const sendUser = ({ username, name, avatar_url, }) => __awaiter(void 0, void 0, void 0, function* () {
    const values = [username, name, avatar_url];
    const queryStr = `INSERT INTO users (username, name, avatar_url) VALUES ($1, $2, $3) RETURNING *`;
    const result = yield connection_1.default.query(queryStr, values);
    return result.rows[0];
});
exports.sendUser = sendUser;
