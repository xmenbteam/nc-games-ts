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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = exports.getUsers = void 0;
const users_model_1 = require("../models/users.model");
const getUsers = ({ params }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = params;
        const users = yield (0, users_model_1.fetchUsers)(username);
        res.status(200).send({ users });
    }
    catch (err) {
        next(err);
    }
});
exports.getUsers = getUsers;
const postUser = ({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, users_model_1.sendUser)(body);
        res.status(201).send({ user });
    }
    catch (err) {
        next(err);
    }
});
exports.postUser = postUser;
