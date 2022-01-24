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
exports.postCategory = exports.getCategories = void 0;
const categories_model_1 = require("../models/categories.model");
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, categories_model_1.fetchCategories)();
        res.status(200).send({ categories });
    }
    catch (err) {
        console.log({ err });
        next(err);
    }
});
exports.getCategories = getCategories;
const postCategory = ({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug, description } = body;
        const category = yield (0, categories_model_1.sendCategory)(slug, description);
        res.status(201).send({ category });
    }
    catch (err) {
        next(err);
    }
});
exports.postCategory = postCategory;
